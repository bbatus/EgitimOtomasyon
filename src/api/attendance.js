import axiosInstance from './base';

export const sendAttendanceData = async (attendanceList) => {
  try {
    const response = await axiosInstance.post('/attendance', { attendanceList });
    return response.data;
  } catch (error) {
    throw error; // handleApiErrors fonksiyonu zaten çağrıldı
  }
};
