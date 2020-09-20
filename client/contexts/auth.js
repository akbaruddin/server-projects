import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import Router, { useRouter } from "next/router";
import api from "../services/Api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get('token');
      if (token) {
        console.log("Got a token in the cookies");
        api.defaults.headers.Authorization = `Bearer ${token}`
        const { data: { user } } = await api.get("users/me");
        if (user) setUser(user);
        Router.push('/dashboard')
      }
    }

    loadUserFromCookies();
  }, []);

  const login = async (email, password) => {
    const { data: { token } } = await api.post("auth/login", { email, password });
    if (token) {
      console.log("Got token")
      Cookies.set('token', token, { expires: 60 })
      api.defaults.headers.Authorization = `Bearer ${token}`
      const { data: { user } } = await api.get("users/me")
      setUser(user)
      console.log("Got user", user)
      Router.push("/dashboard")
    }
  }

  const logout = (email, password) => {
    Cookies.remove('token')
    setUser(null)
    window.location.pathname = '/'
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)
  return context
}

export function ProtectRoute(Component) {
  return () => {
    const { user, isAuthenticated, loading } = useAuth();
    const router = useRouter()

    useEffect(() => {
      if (!isAuthenticated && loading) Router.push('/')
    }, [loading, isAuthenticated])

    return (<Component {...arguments} />)
  }
}

export default useAuth;