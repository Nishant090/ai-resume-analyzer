import { createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setuser] = useState(null);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [loading, setloading] = useState(true);

  const value = {
    user,
    setuser,

    isAuthenticated,
    setisAuthenticated,

    loading,
    setloading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
