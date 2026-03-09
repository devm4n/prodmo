import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accountPresent, setAccountPresent] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;
  const api = axios.create({
    baseURL: API_URL,
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        try {
          const refresh = localStorage.getItem("refresh");
          const res = await axios.post(`${API_URL}/api/v1/auth/refresh/`, {
            refresh,
          });
          localStorage.setItem("access", res.data.access);
          error.config.headers.Authorization = `Bearer ${res.data.access}`;
          return api(error.config);
        } catch {
          logout();
        }
      }
      return Promise.reject(error);
    },
  );

  const login = async (username, password) => {
    const res = await api.post("/api/v1/auth/signin/", { username, password });
    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);
    setUser(res.data.user);
  };

  const register = async (username, password) => {
    await api.post("/api/v1/auth/signup/", { username, password });
    await login(username, password);
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  const fetchuser = async () => {
    try {
      const res = await api.get("/api/v1/user/profile/");
      setUser(res.data);
    } catch (err) {
      const data = err.response?.data;

      const message =
        data.detail ||
        data.non_field_errors?.[0] ||
        Object.values(data).flat()[0];
      setError(message);
      setTimeout(() => setError(null), 3000);
      logout();
    }
  };

  const isAuthenticated = () => !!localStorage.getItem("access");
  const isAdmin = () => user?.role === "admin" || user?.is_staff === true;

  useEffect(() => {
    const init = async () => {
      if (localStorage.getItem("access")) {
        await fetchuser();
      }
      setLoading(false);
    };
    init();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accountPresent,
        setAccountPresent,
        login,
        register,
        isAuthenticated,
        logout,
        user,
        api,
        isAdmin,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
