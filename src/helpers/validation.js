export const validateUsername = (username) => {
    if (username.length > 50) {
      return 'Kullanıcı adı 50 karakterden fazla olamaz';
    }
    return '';
  };
  
  export const validateTc = (tc) => {
    if (tc.length === 0) {
      return '';
    }
    if (tc.length < 11) {
      return 'TC Kimlik No 11 haneli olmalıdır';
    }
    if (tc.startsWith('0')) {
      return 'TC Kimlik No 0 ile başlamamalıdır';
    }
    return '';
  };
  
  export const validatePhone = (phone) => {
    const phonePattern = /^\+90 \(\d{3}\) \d{3} \d{2} \d{2}$/;
    if (!phonePattern.test(phone)) {
      return 'Telefon No geçerli formatta olmalıdır (+90 (___) ___ ____)';
    }
    return '';
  };
  
  