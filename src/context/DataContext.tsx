"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import { usePermissions } from './PermissionsContext';
import { DashboardData, SentLetterData, IncomingLetterData } from "../utils/parser";
import { calculateSLA } from "../utils/sla";

export type ActiveView = 'incoming' | 'received' | 'sent' | 'comparison' | 'data-entry';
export type AdminMode = 'live' | 'local';

export interface DrillDownState {
  title: string;
  data: any[];
  viewType: 'received' | 'sent' | 'incoming';
}

interface FilterState {
  dateRange: { start: string | null; end: string | null };
  departments: string[];
  senders: string[];
  letterType: string[];
  slaStatus: string[];
  completionStatus: 'all' | 'pending' | 'completed';
}

interface DataContextType {
  // Received (Sheet 1)
  data: DashboardData[];
  setData: (data: DashboardData[] | ((prev: DashboardData[]) => DashboardData[])) => void;
  filteredData: DashboardData[];
  baseFilteredData: DashboardData[];
  // Sent (Sheet 2)
  sentData: SentLetterData[];
  setSentData: (data: SentLetterData[]) => void;
  filteredSentData: SentLetterData[];
  baseFilteredSentData: SentLetterData[];
  // Incoming (Sheet 3)
  incomingData: IncomingLetterData[];
  setIncomingData: (data: IncomingLetterData[]) => void;
  filteredIncomingData: IncomingLetterData[];
  baseFilteredIncomingData: IncomingLetterData[];
  // Filters
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  clearFilters: () => void;
  // View
  activeView: ActiveView;
  setActiveView: React.Dispatch<React.SetStateAction<ActiveView>>;
  isPresentationMode: boolean;
  setIsPresentationMode: React.Dispatch<React.SetStateAction<boolean>>;
  dbLoading: boolean;
  mode: AdminMode;
  viewerSelectedUserId: string | null;
  setViewerSelectedUserId: React.Dispatch<React.SetStateAction<string | null>>;
  drillDown: DrillDownState | null;
  setDrillDown: React.Dispatch<React.SetStateAction<DrillDownState | null>>;
}

import { mockReceivedData, mockSentData, mockIncomingData } from "../data/mockData";

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children, mode }: { children: React.ReactNode, mode: AdminMode }) => {
  const [data, setInternalData] = useState<DashboardData[]>(() => mockReceivedData.map(calculateSLA));

  const setData = React.useCallback((input: DashboardData[] | ((prev: DashboardData[]) => DashboardData[])) => {
    setInternalData(prev => {
      const next = typeof input === 'function' ? input(prev) : input;
      return next.map(item => calculateSLA(item));
    });
  }, []);
  const [sentData, setSentData] = useState<SentLetterData[]>(mockSentData);
  const [incomingData, setIncomingData] = useState<IncomingLetterData[]>(mockIncomingData);
  const [activeView, setActiveView] = useState<ActiveView>('received');
  const [filters, setFilters] = useState<FilterState>({
    dateRange: { start: null, end: null },
    departments: [],
    senders: [],
    letterType: [],
    slaStatus: [],
    completionStatus: 'all',
  });
  const [isPresentationMode, setIsPresentationMode] = useState<boolean>(false);
  const [dbLoading, setDbLoading] = useState(false);
  const [viewerSelectedUserId, setViewerSelectedUserId] = useState<string | null>(null);
  const [drillDown, setDrillDown] = useState<DrillDownState | null>(null);

  const { hasPermission, loading: permsLoading } = usePermissions();
  const canFetchDb = hasPermission('db:fetch');

  // Hardcoded Showcase Data initialized immediately
  React.useEffect(() => {
    setDbLoading(false);
  }, []);

  // === VIEWER LIVE DATA FETCHING ===
  React.useEffect(() => {
    if (!viewerSelectedUserId) return;
    
    let isSubscribed = true;
    const fetchViewerData = async () => {
      try {
        const res = await fetch(`/api/presence/data?userId=${viewerSelectedUserId}`);
        if (res.ok && isSubscribed) {
          const json = await res.json();
          setData(json.data || []);
          setSentData(json.sentData || []);
          setIncomingData(json.incomingData || []);
        }
      } catch (err) {
        console.error("Failed to fetch viewer data:", err);
      }
    };

    fetchViewerData();
    const interval = setInterval(fetchViewerData, 2000); // Polling every 2s to keep live view synced
    return () => {
      isSubscribed = false;
      clearInterval(interval);
    };
  }, [viewerSelectedUserId]);

  // === RECEIVED DATA FILTERS ===

  // Base filtered data: all filters EXCEPT completionStatus
  // Used by KPI cards so their values stay stable when a KPI card is clicked
  const baseFilteredData = useMemo(() => {
    return data.filter((item) => {
      // Date filter
      if (filters.dateRange.start && item.sentDate) {
        if (new Date(item.sentDate) < new Date(filters.dateRange.start)) return false;
      }
      if (filters.dateRange.end && item.sentDate) {
        if (new Date(item.sentDate) > new Date(filters.dateRange.end)) return false;
      }

      // Department filter
      if (filters.departments.length > 0 && !item.departments.some(d => filters.departments.includes(d))) {
        return false;
      }

      // Letter Type filter
      if (filters.letterType.length > 0 && !filters.letterType.includes(item.letterType)) {
        return false;
      }

      // SLA Status filter
      if (filters.slaStatus.length > 0 && (!item.slaTime || !filters.slaStatus.includes(item.slaTime))) {
        return false;
      }

      return true;
    });
  }, [data, filters.dateRange, filters.departments, filters.letterType, filters.slaStatus]);

  // Full filtered data: includes completionStatus filter on top of baseFilteredData
  // Used by charts, data table, and detail views
  const filteredData = useMemo(() => {
    if (filters.completionStatus === 'all') return baseFilteredData;
    return baseFilteredData.filter((item) => {
      if (filters.completionStatus === 'pending' && item.responseDate !== null) return false;
      if (filters.completionStatus === 'completed' && item.responseDate === null) return false;
      return true;
    });
  }, [baseFilteredData, filters.completionStatus]);

  // === SENT DATA FILTERS ===

  const baseFilteredSentData = useMemo(() => {
    return sentData.filter((item) => {
      // Date filter
      if (filters.dateRange.start && item.sentDate) {
        if (new Date(item.sentDate) < new Date(filters.dateRange.start)) return false;
      }
      if (filters.dateRange.end && item.sentDate) {
        if (new Date(item.sentDate) > new Date(filters.dateRange.end)) return false;
      }

      // Department filter
      if (filters.departments.length > 0 && !item.departments.some(d => filters.departments.includes(d))) {
        return false;
      }

      // Letter Type filter
      if (filters.letterType.length > 0 && !filters.letterType.includes(item.letterType)) {
        return false;
      }

      return true;
    });
  }, [sentData, filters.dateRange, filters.departments, filters.letterType]);

  // For sent data, no completion status applies — same as base
  const filteredSentData = useMemo(() => baseFilteredSentData, [baseFilteredSentData]);

  // === INCOMING DATA FILTERS ===
  const baseFilteredIncomingData = useMemo(() => {
    let filtered = [...incomingData];
    if (filters.dateRange.start && filters.dateRange.end) {
      const start = new Date(filters.dateRange.start).getTime();
      const end = new Date(filters.dateRange.end).getTime();
      filtered = filtered.filter(item => {
        if (!item.sentDate) return false;
        const itemDate = new Date(item.sentDate).getTime();
        return itemDate >= start && itemDate <= end;
      });
    }
    if (filters.departments.length > 0) {
      filtered = filtered.filter(item => 
        item.departments.some(d => filters.departments.includes(d))
      );
    }
    if (filters.senders.length > 0) {
      filtered = filtered.filter(item => 
        item.sender && filters.senders.includes(item.sender)
      );
    }
    if (filters.letterType.length > 0) {
      filtered = filtered.filter(item => 
        filters.letterType.includes(item.letterType)
      );
    }
    return filtered;
  }, [incomingData, filters.dateRange, filters.departments, filters.senders, filters.letterType]);

  const filteredIncomingData = useMemo(() => baseFilteredIncomingData, [baseFilteredIncomingData]);

  const clearFilters = () => {
    setFilters({
      dateRange: { start: null, end: null },
      departments: [],
      senders: [],
      letterType: [],
      slaStatus: [],
      completionStatus: 'all',
    });
  };

  return (
    <DataContext.Provider
      value={{
        data, setData,
        filteredData, baseFilteredData,
        sentData, setSentData,
        filteredSentData, baseFilteredSentData,
        incomingData, setIncomingData,
        filteredIncomingData, baseFilteredIncomingData,
        filters, setFilters, clearFilters,
        activeView, setActiveView,
        isPresentationMode, setIsPresentationMode,
        dbLoading, mode,
        viewerSelectedUserId, setViewerSelectedUserId,
        drillDown,
        setDrillDown
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
