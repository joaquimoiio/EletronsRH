// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  UPLOAD_URL: import.meta.env.VITE_UPLOAD_BASE_URL || 'http://localhost:8080/uploads',
  TIMEOUT: 30000,
};

// Status
export const STATUS_VAGA = {
  ABERTA: 'ABERTA',
  FECHADA: 'FECHADA',
  PAUSADA: 'PAUSADA',
};

export const STATUS_CANDIDATO = {
  AGUARDANDO: 'AGUARDANDO',
  CHAMADO: 'CHAMADO',
  APROVADO: 'APROVADO',
  REPROVADO: 'REPROVADO',
};

// Routes
export const ROUTES = {
  HOME: '/',
  VAGAS: '/vagas',
  VAGA_DETALHES: '/vagas/:id',
  EVENTOS: '/eventos',
  EVENTO_DETALHES: '/eventos/:id',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_VAGAS: '/admin/vagas',
  ADMIN_EVENTOS: '/admin/eventos',
  ADMIN_AREAS: '/admin/areas',
  ADMIN_CANDIDATOS: '/admin/vagas/:vagaId/candidatos',
};

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
};

// Messages
export const MESSAGES = {
  SUCCESS: {
    LOGIN: 'Login realizado com sucesso!',
    LOGOUT: 'Logout realizado com sucesso!',
    SAVE: 'Salvo com sucesso!',
    DELETE: 'Excluído com sucesso!',
    UPDATE: 'Atualizado com sucesso!',
  },
  ERROR: {
    GENERIC: 'Ocorreu um erro. Tente novamente.',
    LOGIN: 'Credenciais inválidas',
    NETWORK: 'Erro de conexão. Verifique sua internet.',
    NOT_FOUND: 'Recurso não encontrado',
  },
};

// Validation
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\(?[1-9]{2}\)?\s?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$/,
  MIN_PASSWORD_LENGTH: 6,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
};
