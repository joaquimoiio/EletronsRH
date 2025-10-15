import { VALIDATION } from '../config/constants';

/**
 * Valida um email
 * @param {string} email - Email a ser validado
 * @returns {boolean} True se válido
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  return VALIDATION.EMAIL_REGEX.test(email);
};

/**
 * Valida um telefone
 * @param {string} phone - Telefone a ser validado
 * @returns {boolean} True se válido
 */
export const isValidPhone = (phone) => {
  if (!phone) return false;
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10 || cleaned.length === 11;
};

/**
 * Valida uma senha
 * @param {string} password - Senha a ser validada
 * @returns {boolean} True se válida
 */
export const isValidPassword = (password) => {
  if (!password) return false;
  return password.length >= VALIDATION.MIN_PASSWORD_LENGTH;
};

/**
 * Valida o tamanho de um arquivo
 * @param {File} file - Arquivo a ser validado
 * @returns {boolean} True se válido
 */
export const isValidFileSize = (file) => {
  if (!file) return false;
  return file.size <= VALIDATION.MAX_FILE_SIZE;
};

/**
 * Valida se uma string não está vazia
 * @param {string} value - Valor a ser validado
 * @returns {boolean} True se não estiver vazio
 */
export const isNotEmpty = (value) => {
  return value && value.trim().length > 0;
};
