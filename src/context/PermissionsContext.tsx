"use client";

import React, { createContext, useContext, useCallback } from 'react';

type PermissionKey = 'data:edit' | 'data:upload' | 'users:manage' | 'roles:manage' | 'db:fetch' | 'view:presentation' | 'view:analytics';

interface PermissionsContextType {
  permissions: string[];
  hasPermission: (key: PermissionKey) => boolean;
  loading: boolean;
}

const ALL_PERMISSIONS: PermissionKey[] = [
  'data:edit',
  'data:upload',
  'users:manage',
  'roles:manage',
  'db:fetch',
  'view:presentation',
  'view:analytics'
];

const PermissionsContext = createContext<PermissionsContextType>({
  permissions: ALL_PERMISSIONS,
  hasPermission: () => true,
  loading: false,
});

export const PermissionsProvider = ({ children }: { children: React.ReactNode }) => {
  const hasPermission = useCallback((_key: PermissionKey) => {
    return true;
  }, []);

  return (
    <PermissionsContext.Provider value={{ permissions: ALL_PERMISSIONS, hasPermission, loading: false }}>
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissions = () => useContext(PermissionsContext);
