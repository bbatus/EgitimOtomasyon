const API_URL = 'https://api.example.com/students'; // API URL'sini kendi backend'inizle değiştirin

// GET: Öğrenci listesini getir
export const fetchStudents = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Öğrenci listesi alınamadı');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// POST: Yeni öğrenci ekle
export const addStudent = async (student) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });
    if (!response.ok) {
      throw new Error('Öğrenci eklenemedi');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// PUT: Öğrenciyi güncelle
export const updateStudent = async (id, student) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });
    if (!response.ok) {
      throw new Error('Öğrenci güncellenemedi');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// DELETE: Öğrenciyi sil
export const deleteStudent = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Öğrenci silinemedi');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
