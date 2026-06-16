"use client";

import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children, initailUser }) {
  const [user, setUser] = useState(initailUser);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
