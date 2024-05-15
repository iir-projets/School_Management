import { useState, useEffect } from 'react';
import axios from 'axios';

const GradeManagement = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [gradeValue, setGradeValue] = useState('');

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8099/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8099/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleStudentChange = (event) => {
    setSelectedStudent(event.target.value);
  };

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleGradeChange = (event) => {
    setGradeValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8099/api/grades', {
        studentId: selectedStudent,
        courseId: selectedCourse,
        gradeValue: parseFloat(gradeValue) // Convertir la valeur de la note en nombre
      });
      alert('Grade recorded successfully.');
    } catch (error) {
      console.error('Error recording grade:', error);
      alert('An error occurred while recording grade.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Grade Management</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="student" className="form-label">Select Student</label>
          <select
            className="form-control"
            id="student"
            value={selectedStudent}
            onChange={handleStudentChange}
            required
          >
            <option value="">Select a Student</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>{student.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="course" className="form-label">Select Course</label>
          <select
            className="form-control"
            id="course"
            value={selectedCourse}
            onChange={handleCourseChange}
            required
          >
            <option value="">Select a Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="grade" className="form-label">Enter Grade</label>
          <input
            type="text"
            className="form-control"
            id="grade"
            value={gradeValue}
            onChange={handleGradeChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Record Grade</button>
      </form>
    </div>
  );
};

export default GradeManagement;
