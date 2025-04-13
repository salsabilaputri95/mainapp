import { API_ENDPOINTS, getHeaders } from '@/config/api';
import Cookies from 'js-cookie';

export const authService = {
  login: async (nikadmin, password) => {
    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          nikadmin,
          password,
        }),
        credentials: 'include', // Tambahkan ini jika backend menggunakan cookies
      });

      const responseData = await response.json();

      if (!response.ok || responseData.status !== 'OK') {
        return {
          success: false,
          error: responseData.message || 'Login gagal',
        };
      }

      const { token, user } = responseData.data;
      return {
        success: true,
        data: {
          token,
          user,
        },
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: 'Terjadi kesalahan saat login. Silakan coba lagi.',
      };
    }
  },

  validateToken: async (token) => {
    try {
      const response = await fetch(`${API_ENDPOINTS.LOGIN.replace('/login', '/me')}`, {
        method: 'GET',
        headers: getHeaders(token),
        credentials: 'include', // Tambahkan ini jika backend menggunakan cookies
      });
      return response.ok;
    } catch (error) {
      console.error('Validate token error:', error);
      return false;
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await fetch(API_ENDPOINTS.FORGOT_PASSWORD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email }),
        credentials: 'include', // Tambahkan ini jika backend menggunakan cookies
      });

      const responseData = await response.json();

      if (!response.ok || responseData.status !== 'OK') {
        return {
          success: false,
          error: responseData.message || 'Gagal mengirim link reset.',
        };
      }

      return {
        success: true,
        message: responseData.message,
      };
    } catch (error) {
      console.error('Forgot password error:', error);
      return {
        success: false,
        error: 'Terjadi kesalahan. Silakan coba lagi.',
      };
    }
  },

  resetPassword: async (token, password) => {
    try {
      const response = await fetch(API_ENDPOINTS.RESET_PASSWORD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ token, password }),
        credentials: 'include', // Tambahkan ini jika backend menggunakan cookies
      });

      const responseData = await response.json();

      if (!response.ok || responseData.status !== 'ok') {
        return {
          success: false,
          error: responseData.message || 'Gagal mereset password.',
        };
      }

      return {
        success: true,
        message: responseData.message,
      };
    } catch (error) {
      console.error('Reset password error:', error);
      return {
        success: false,
        error: 'Terjadi kesalahan. Silakan coba lagi.',
      };
    }
  },
};