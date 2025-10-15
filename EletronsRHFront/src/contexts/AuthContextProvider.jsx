import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext.js';
import { authService } from '../services/api';
import { STORAGE_KEYS } from '../config/constants';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há um token salvo
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    const userDataStr = localStorage.getItem(STORAGE_KEYS.USER_DATA);

    if (token && userDataStr) {
      try {
        const userData = JSON.parse(userDataStr);
        setUser({ authenticated: true, ...userData });
      } catch (error) {
        console.error('Erro ao restaurar dados do usuário:', error);
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER_DATA);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);

      if (response.data.success) {
        const userData = {
          id: response.data.id,
          email: response.data.email,
          role: response.data.role,
        };

        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, 'authenticated');
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
        setUser({ authenticated: true, ...userData });
        return { success: true };
      } else {
        return {
          success: false,
          message: response.data.message || 'Erro ao fazer login'
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Email ou senha incorretos'
      };
    }
  };

  const logout = () => {
    authService.logout();
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
