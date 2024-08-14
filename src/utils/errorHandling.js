// src/utils/errorHandling.js

export const handleApiErrors = (error) => {
    if (error.response) {
      // Sunucu bir yanıt döndürdü
      const { status, data } = error.response;
      switch (status) {
        case 400:
          return Promise.reject(data.message || 'Geçersiz istek.');
        case 401:
          return Promise.reject(data.message || 'Yetkisiz erişim.');
        case 404:
          return Promise.reject(data.message || 'Kaynak bulunamadı.');
        case 500:
          return Promise.reject('Sunucu hatası.');
        default:
          return Promise.reject(data.message || 'Bilinmeyen bir hata oluştu.');
      }
    } else if (error.request) {
      // İstek yapıldı ancak yanıt alınamadı
      return Promise.reject('Sunucudan yanıt alınamadı.');
    } else {
      // İstek hazırlama sırasında bir hata oluştu
      return Promise.reject('İstek hazırlama hatası.');
    }
  };
  