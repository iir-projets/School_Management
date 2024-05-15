import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '', schoolClassId: '',schoolClassName:''});
  const [schoolClasses, setSchoolClasses] = useState([]);

  useEffect(() => {
    fetchStudents();
    fetchSchoolClasses();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8099/student');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchSchoolClasses = async () => {
    try {
      const response = await axios.get('http://localhost:8099/schoolclass');
      setSchoolClasses(response.data);
    } catch (error) {
      console.error('Error fetching school classes:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8099/student/${id}`);
      alert('Student deleted successfully.');
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };
  const handleModify = async (student) => {
    try {
      const response = await axios.put(`http://localhost:8099/student/${student.id}`, student); // Modify only the passed student object
      alert('Student modified successfully.');
      fetchStudents();
    } catch (error) {
      console.error('Error modifying student:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8099/student', newStudent);
      alert('Student added successfully.');
      fetchStudents();
      setNewStudent({ firstName: '', lastName: '', email: '', phone: '', address: '', schoolClassId: '',schoolClassName:'' });
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
      <div className="container mt-4">
        <h1>Student List</h1>
        <table className="table table-striped">
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Class</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {Array.isArray(students) && students.length > 0 ? (
              students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.email}</td>
                    <td>{student.phone}</td>
                    <td>{student.schoolClassName}</td>
                    <td>
                      <button className="btn btn-sm btn-primary" onClick={() => handleModify(student)}>Modify</button>
                      <button onClick={() => handleDelete(student.id)} className="btn btn-sm btn-danger ms-2">Delete
                      </button>

                    </td>
                  </tr>
              ))
          ) : (
              <tr>
                <td colSpan="4">No students found</td>
              </tr>
          )}
          </tbody>
        </table>

        {/* Add Student Form */}
        <form onSubmit={handleSubmit} className="container mt-4">
          <h2>Add Student</h2>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={newStudent.firstName}
                onChange={handleChange}
                className="form-control"
                required
            />
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={newStudent.lastName}
                onChange={handleChange}
                className="form-control"
                required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={newStudent.email}
                onChange={handleChange}
                className="form-control"
                required
            />
            <label htmlFor="phone" className="form-label">Phone</label>
            <input
                type="number"
                name="phone"
                placeholder="Phone"
                value={newStudent.phone}
                onChange={handleChange}
                className="form-control"
                required
            />
            <label htmlFor="address" className="form-label">Address</label>
            <input
                type="text"
                name="address"
                placeholder="Address"
                value={newStudent.address}
                onChange={handleChange}
                className="form-control"
                required
            />

            <label htmlFor="schoolClassId" className="form-label">Select Class</label>
            <select
                name="schoolClassId"
                value={newStudent.schoolClassId}
                onChange={handleChange}
                className="form-control"
                required
            >
              <option value="">Select a class</option>
              {schoolClasses.map(schoolClass => (
                  <option key={schoolClass.id} value={schoolClass.id}>
                    {schoolClass.className}
                  </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary">Add Student</button>
        </form>
      </div>
  );
};

export default StudentList;
