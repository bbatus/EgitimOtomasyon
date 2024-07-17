// src/helpers/adminHelpers.js
export const addStudent = (newStudent, setStudents) => {
    setStudents((prevStudents) => [...prevStudents, { ...newStudent, id: prevStudents.length + 1 }]);
  };
  
  export const updateStudent = (updatedStudent, setStudents) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => (student.id === updatedStudent.id ? updatedStudent : student))
    );
  };
  
  export const addStudentsFromExcel = (students, setStudents, navigate) => {
    setStudents((prevStudents) => [
      ...prevStudents,
      ...students.map((student, index) => ({ ...student, id: prevStudents.length + index + 1 })),
    ]);
    alert('Excel dosyasından öğrenciler eklendi!');
    navigate('/dashboard/registration/student');
  };
  
  export const addTeacher = (newTeacher, setTeachers) => {
    setTeachers((prevTeachers) => [...prevTeachers, { ...newTeacher, id: prevTeachers.length + 1 }]);
  };
  
  export const updateTeacher = (updatedTeacher, setTeachers) => {
    setTeachers((prevTeachers) =>
      prevTeachers.map((teacher) => (teacher.id === updatedTeacher.id ? updatedTeacher : teacher))
    );
  };
  
  export const addCourse = (newCourse, setCourses) => {
    setCourses((prevCourses) => [...prevCourses, { ...newCourse, id: prevCourses.length + 1 }]);
  };
  