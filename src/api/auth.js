// src/api/auth.js

import axiosInstance from './base';
import { saveToken } from '../utils/token';

export const login = async (username, password) => {
  try {
    const response = await axiosInstance.post('/Login', { username, password });
    const { Token, User } = response.data;
    saveToken(Token);
    return { user: User };
  } catch (error) {
    throw error; // handleApiErrors fonksiyonu zaten çağrıldı
  }
};
