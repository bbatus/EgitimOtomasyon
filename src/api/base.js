import axios from 'axios';
import { getToken, removeToken } from '../utils/token';
import { handleApiErrors } from '../utils/errorHandling';

const API_BASE_URL = 'http://your-backend-api.com/api'; // Backend API'nin temel URL'si

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// İstek interceptor'u: Tüm isteklere JWT tokenını ekler
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Yanıt interceptor'u: Hataları yönetir
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Eğer 401 Unauthorized hatası alırsak, token'ı silebiliriz
    if (error.response && error.response.status === 401) {
      removeToken();
      // Gerekirse kullanıcıyı login sayfasına yönlendirebilirsiniz
    }
    return handleApiErrors(error);
  }
);

export default axiosInstance;
