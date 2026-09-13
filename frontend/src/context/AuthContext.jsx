import { createContext, useCallback, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "interview-ai-auth";

function readStoredAuth() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return {
        user: null,
        token: null,
      };
    }

    return JSON.parse(stored);
  } catch {
    return {
      user: null,
      token: null,
    };
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(readStoredAuth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (auth.user || auth.token) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [auth]);

  const login = useCallback((user, token) => {
    setAuth({
      user,
      token,
    });
  }, []);

  const logout = useCallback(() => {
    setAuth({
      user: null,
      token: null,
    });
  }, []);

  const updateUser = useCallback((user) => {
    setAuth((current) => ({
      ...current,
      user,
    }));
  }, []);

  const value = useMemo(
    () => ({
      user: auth.user,
      token: auth.token,
      isAuthenticated: Boolean(auth.token),
      loading,
      login,
      logout,
      updateUser,
    }),
    [auth, loading, login, logout, updateUser]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;