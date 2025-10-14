import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há um token salvo
    const token = localStorage.getItem('authToken');
    const userDataStr = localStorage.getItem('userData');

    if (token && userDataStr) {
      try {
        const userData = JSON.parse(userDataStr);
        setUser({ authenticated: true, ...userData });
      } catch (error) {
        console.error('Erro ao restaurar dados do usuário:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
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

        localStorage.setItem('authToken', 'authenticated');
        localStorage.setItem('userData', JSON.stringify(userData));
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
    localStorage.removeItem('userData');
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
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
