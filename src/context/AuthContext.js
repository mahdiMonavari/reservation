"use client";

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children, initailUser }) {
  const [user, setUser] = useState(initailUser);

  useEffect(() => {
    if (initailUser) {
      setUser(initailUser);
    }
  }, [initailUser]);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
