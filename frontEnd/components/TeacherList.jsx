import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from 'react-bootstrap/Badge';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    schoolClassesIds: [],
    subjectIds: [],
    subjectNames: [],
    schoolNames: [],
  });
  const [schoolClasses, setSchoolClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchTeachers();
    fetchSchoolClasses();
    fetchSubjects();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:8099/teacher');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching Teachers:', error);
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

  const fetchSubjects = async () => {
    try {
      const response = await axios.get('http://localhost:8099/subject');
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher({ ...newTeacher, [name]: value });
  };

  const handleDeleteBadge = (index, type) => {
    if (type === 'class') {
      const updatedClasses = [...newTeacher.schoolClassesIds];
      updatedClasses.splice(index, 1);
      setNewTeacher({ ...newTeacher, schoolClassesIds: updatedClasses });
    } else if (type === 'subject') {
      const updatedSubjects = [...newTeacher.subjectIds];
      updatedSubjects.splice(index, 1);
      setNewTeacher({ ...newTeacher, subjectIds: updatedSubjects });
    }
  };

  const handleAddBadge = (value, type) => {
    if (type === 'class') {
      setNewTeacher({ ...newTeacher, schoolClassesIds: [...newTeacher.schoolClassesIds, value] });
    } else if (type === 'subject') {
      setNewTeacher({ ...newTeacher, subjectIds: [...newTeacher.subjectIds, value] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8099/teacher', newTeacher);
      alert('Teacher added successfully.');
      fetchTeachers();
      setNewTeacher({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        schoolClassesIds: [],
        subjectIds: [],
      });
    } catch (error) {
      console.error('Error adding Teacher:', error);
    }
  };

  return (
      <div className="container mt-4">
        <h1>Teacher List</h1>
        <table className="table table-striped">
          <thead>
          <tr>

            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Classes</th>
            <th>Subjects</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {Array.isArray(teachers) && teachers.length > 0 ? (
              teachers.map((teacher) => (
                  <tr key={teacher.id}>
                    <td>{teacher.firstName}</td>
                    <td>{teacher.lastName}</td>
                    <td>{teacher.email}</td>
                    <td>{teacher.phone}</td>
                    <td>{teacher.schoolNames.join(' ')}</td>
                    <td>{teacher.subjectNames.join(' ')}</td>
                    <td>
                      <button className="btn btn-sm btn-primary" onClick={() => handleModify(teacher)}>Modify</button>
                      <button onClick={() => handleDelete(teacher.id)} className="btn btn-sm btn-danger ms-2">Delete
                      </button>

                    </td>
                  </tr>
              ))
          ) : (
              <tr>
                <td colSpan="4">No Teachers Found</td>
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
                value={newTeacher.firstName}
                onChange={handleChange}
                className="form-control"
                required
            />
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={newTeacher.lastName}
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
                value={newTeacher.email}
                onChange={handleChange}
                className="form-control"
                required
            />
            <label htmlFor="phone" className="form-label">Phone</label>
            <input
                type="number"
                name="phone"
                placeholder="Phone"
                value={newTeacher.phone}
                onChange={handleChange}
                className="form-control"
                required
            />
            <label htmlFor="address" className="form-label">Address</label>
            <input
                type="text"
                name="address"
                placeholder="Address"
                value={newTeacher.address}
                onChange={handleChange}
                className="form-control"
                required
            />

            <label htmlFor="schoolClassesIds" className="form-label">Select Classes</label>
            <select
                name="schoolClassesIds"
                value={''} // Resetting value after each selection
                onChange={(e) => handleAddBadge(e.target.value, 'class')}
                className="form-control"

            >
              <option value="">Select a class</option>
              {schoolClasses.map(schoolClass => (
                  <option key={schoolClass.id} value={schoolClass.id}>
                    {schoolClass.className}
                  </option>
              ))}
            </select>
            {/* Display selected classes as badges */}
            {newTeacher.schoolClassesIds.map((classId, index) => (
                <Badge key={index} bg="primary" className="me-2 mt-2" onClick={() => handleDeleteBadge(index, 'class')}>
                  {schoolClasses.find(item => item.id === classId).className}
                </Badge>
            ))}
            <label htmlFor="subjectIds" className="form-label">Select Subjects</label>
            <select
                name="subjectIds"
                value={''} // Resetting value after each selection
                onChange={(e) => handleAddBadge(e.target.value, 'subject')}
                className="form-control"

            >
              <option value="">Select a subject</option>
              {subjects.map(subject => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
              ))}
            </select>
            {/* Display selected subjects as badges */}
            {newTeacher.subjectIds.map((subjectId, index) => (
                <Badge key={index} bg="secondary" className="me-2 mt-2" onClick={() => handleDeleteBadge(index, 'subject')}>
                  {subjects.find(item => item.id === subjectId).name}
                </Badge>
            ))}
          </div>

          <button type="submit" className="btn btn-primary">Add Teacher</button>
        </form>
      </div>
  );
};

export default TeacherList;
