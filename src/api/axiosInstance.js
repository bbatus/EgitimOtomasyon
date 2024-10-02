// src/api/axiosInstance.js

import axios from 'axios';

// Merkezi hata yönetimi fonksiyonu
const errorHandler = (error) => {
  if (error.response) {
    const { status, data } = error.response;

    // Hata mesajını sabit bir değişkende tutuyoruz.
    let message = data.message || 'Bilinmeyen bir hata meydana geldi.';

    // Status koduna göre hata mesajını yönetiyoruz.
    switch (status) {
      case 400:
        message = 'Geçersiz istek. Lütfen verilerinizi kontrol edin.';
        break;
      case 401:
        message = 'Oturum süreniz doldu, lütfen tekrar giriş yapın.';
        localStorage.removeItem('access_token');
        // Yönlendirme işlemi
        window.location.href = '/login';
        break;
      case 403:
        message = 'Bu işlem için yetkiniz bulunmuyor.';
        break;
      case 404:
        message = 'İstediğiniz veri bulunamadı.'; // 404 hatası mesajı
        break;
      case 500:
        message = 'Sunucu hatası meydana geldi, lütfen daha sonra tekrar deneyin.';
        break;
      default:
        message = data.message || 'Bilinmeyen bir hata meydana geldi.';
        break;
    }

    // Hata mesajını Promise.reject ile döndürüyoruz.
    return Promise.reject({ message, status });
  } else if (error.request) {
    // Request gönderilmiş ama sunucudan cevap alınamamış
    return Promise.reject({ message: 'Sunucuya erişilemiyor. Lütfen internet bağlantınızı kontrol edin.' });
  } else {
    // Request yapılamadan önce bir hata oluşmuş
    return Promise.reject({ message: `Hata: ${error.message}` });
  }
};

// Axios instance oluşturma
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3003',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // CORS ve kimlik doğrulama işlemleri için gerekli olabilir
});

// JWT token eklemek için bir interceptor oluşturun
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // String interpolation düzeltildi
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API yanıtlarını yönetmek için bir interceptor oluşturun
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => errorHandler(error)
);

export default axiosInstance;
