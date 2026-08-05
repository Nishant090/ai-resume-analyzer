import { createContext, useState, useEffect } from "react";
import * as authService from "../services/auth.services.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const data = await authService.getUserData();
      setUser(data.user);
      setisAuthenticated(true);
    } catch {
      setUser(null);
      setisAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (credentials) => {
    await authService.login(credentials);
    await checkAuth();
  };

  const register = async(userData)=>{
    await authService.register(userData)
    await checkAuth()
  }

  const logout = async()=>{
    await authService.logout();
    setUser(null)
    setisAuthenticated(false)
  }
  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    checkAuth
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
