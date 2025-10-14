import axios from 'axios';

// Configuração base da API - integrada com o backend existente
const API_BASE_URL = 'http://localhost:8080/api';
const UPLOAD_BASE_URL = 'http://localhost:8080/uploads';

// Criar instância do axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token inválido ou expirado
      localStorage.removeItem('authToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Serviços de Áreas
export const areasService = {
  getAll: () => api.get('/areas'),
  getById: (id) => api.get(`/areas/${id}`),
  create: (data) => api.post('/areas', data),
  update: (id, data) => api.put(`/areas/${id}`, data),
  delete: (id) => api.delete(`/areas/${id}`),
};

// Serviços de Vagas
export const vagasService = {
  getAll: () => api.get('/vagas'),
  getById: (id) => api.get(`/vagas/${id}`),
  getByArea: (areaId) => api.get(`/vagas/area/${areaId}`),
  create: (data) => api.post('/vagas', data),
  update: (id, data) => api.put(`/vagas/${id}`, data),
  delete: (id) => api.delete(`/vagas/${id}`),
};

// Serviços de Eventos
export const eventosService = {
  getAll: () => api.get('/eventos'),
  getById: (id) => api.get(`/eventos/${id}`),
  create: (formData) => {
    return api.post('/eventos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  update: (id, formData) => {
    return api.put(`/eventos/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  delete: (id) => api.delete(`/eventos/${id}`),
};

// Serviço de Autenticação
export const authService = {
  login: (email, password) => api.post('/login', { email, senha: password }),
  logout: () => {
    localStorage.removeItem('authToken');
  },
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },
};

// Função helper para obter URL de upload
export const getUploadUrl = (path) => {
  if (!path) return null;
  return `${UPLOAD_BASE_URL}/${path}`;
};

export default api;
