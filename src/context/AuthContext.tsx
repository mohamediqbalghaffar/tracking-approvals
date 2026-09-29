"use client";

import React, { createContext, useContext } from "react";
import { PermissionsProvider } from "./PermissionsContext";

export type UserRole = "admin" | "user" | "viewer" | "guest" | null;

export interface AuthUser {
  username: string;
  role: UserRole;
  email?: string;
  status?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  viewerCode: string;
  logout: () => void;
  isLoading: boolean;
  updateSession: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const HARDCODED_VIEWER_CODE = "view2026";

const SHOWCASE_USER: AuthUser = {
  username: "Showcase Admin",
  role: "admin",
  email: "admin@tracking-approvals.demo",
  status: "approved"
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthContext.Provider 
      value={{ 
        user: SHOWCASE_USER, 
        viewerCode: HARDCODED_VIEWER_CODE, 
        logout: () => {}, 
        isLoading: false, 
        updateSession: () => {} 
      }}
    >
      <PermissionsProvider>
        {children}
      </PermissionsProvider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
