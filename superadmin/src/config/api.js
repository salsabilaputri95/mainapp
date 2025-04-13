export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/api/user/login`,
  FORGOT_PASSWORD: `${API_BASE_URL}/api/user/forgot-password`,
  RESET_PASSWORD: `${API_BASE_URL}/api/user/reset-password`,
  PENDUDUK_GET_ALL: `${API_BASE_URL}/api/warga`,
  PENDUDUK_ADD: `${API_BASE_URL}/api/warga`,
  PENDUDUK_UPDATE: `${API_BASE_URL}/api/warga/:id`,
  PENDUDUK_DELETE: `${API_BASE_URL}/api/warga/:id`,
  PEMASUKAN_ADD: `${API_BASE_URL}/api/pemasukan/add`,
  PENGELUARAN_ADD: `${API_BASE_URL}/api/pengeluaran/add`,
  PEMASUKAN_GET_ALL: `${API_BASE_URL}/api/pemasukan`,
  PENGELUARAN_GET_ALL: `${API_BASE_URL}/api/pengeluaran`,
};

export const getHeaders = (token = '') => ({
  'Content-Type': 'application/json',
  'Authorization': token ? `Bearer ${token}` : '',
  'ngrok-skip-browser-warning': 'true',
});