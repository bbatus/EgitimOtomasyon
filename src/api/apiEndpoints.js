// src/api/apiEndpoints.js

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3004';

// AUTH ve STUDENT API yollarını ayrı ayrı dışa aktarıyoruz.
export const AUTH_API = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
};

export const STUDENT_API = {
  GET_ALL: `${API_BASE_URL}/students/get-all-students`,
  ADD: `${API_BASE_URL}/students/add-student`,
  DELETE: `${API_BASE_URL}/students/delete-student-by-tcNo`,
  GET_BY_CLASS: `${API_BASE_URL}/students/get-students-by-class`,
  MULTIPLE_ADD: `${API_BASE_URL}/students/add-multiple-student`,
};

// Tüm endpointleri `endpoints` isimli bir obje içerisinde grupluyoruz.
const endpoints = {
  AUTH: AUTH_API,
  STUDENT: STUDENT_API,
  // Diğer API gruplarını buraya ekleyebilirsiniz...
};

export default endpoints;
