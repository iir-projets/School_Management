import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddTeacherForm = ({ onAddTeacher, subjects, schoolClasses }) => {
  const [teacherData, setTeacherData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    subjectIds: [],
    schoolClassesIds: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTeacherData({
      ...teacherData,
      [name]: value,
    });
  };

  const handleSubjectChange = (event) => {
    const selectedSubjects = Array.from(event.target.selectedOptions, (option) => option.value);
    setTeacherData({
      ...teacherData,
      subjectIds: selectedSubjects,
    });
  };

  const handleSchoolClassChange = (event) => {
    const selectedClasses = Array.from(event.target.selectedOptions, (option) => option.value);
    setTeacherData({
      ...teacherData,
      schoolClassesIds: selectedClasses,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8099/api/teachers', teacherData);
      onAddTeacher(response.data);
      setTeacherData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        subjectIds: [],
        schoolClassesIds: [],
      });
    } catch (error) {
      console.error('Error adding teacher:', error);
    }
  };

  return (
      <div className="container mt-4">
        <h2>Add Teacher</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={teacherData.firstName}
                onChange={handleInputChange}
                required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={teacherData.lastName}
                onChange={handleInputChange}
                required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={teacherData.email}
                onChange={handleInputChange}
                required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                value={teacherData.phone}
                onChange={handleInputChange}
                required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={teacherData.address}
                onChange={handleInputChange}
                required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="subjectIds" className="form-label">Subjects</label>
            <select
                multiple
                className="form-control"
                id="subjectIds"
                name="subjectIds"
                value={teacherData.subjectIds}
                onChange={handleSubjectChange}
                required
            >
              {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>{subject.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="schoolClassesIds" className="form-label">School Classes</label>
            <select
                multiple
                className="form-control"
                id="schoolClassesIds"
                name="schoolClassesIds"
                value={teacherData.schoolClassesIds}
                onChange={handleSchoolClassChange}
                required
            >
              {schoolClasses.map((schoolClass) => (
                  <option key={schoolClass.id} value={schoolClass.id}>{schoolClass.className}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
  );
};

export default AddTeacherForm;
