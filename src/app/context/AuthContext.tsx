"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useState, useContext, useEffect } from "react";

interface AuthContextType {
  userName: string | null;
  setUserName: (userName: string | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const isAuthenticated = !!userName;

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const logout = () => {
    router.push("/signin");
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    setUserName(null);
  };

  return (
    <AuthContext.Provider
      value={{ userName, setUserName, isAuthenticated, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
