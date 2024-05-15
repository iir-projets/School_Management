// EditStudent.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const EditStudent = () => {
  const [studentData, setStudentData] = useState({
    id: '',
    nom: '',
    email: '',
    classeId: '',
  });

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchStudent();
    fetchClasses();
  }, []);

  const fetchStudent = async () => {
    try {
      // Récupération de l'étudiant depuis l'API (remplacer l'URL par l'URL réelle)
      const response = await axios.get('http://localhost:8099/api/students/1');
      setStudentData(response.data);
    } catch (error) {
      console.error('Error fetching student:', error);
    }
  };

  const fetchClasses = async () => {
    try {
      // Récupération de la liste des classes depuis l'API (remplacer l'URL par l'URL réelle)
      const response = await axios.get('http://localhost:8099/api/classes');
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStudentData({
      ...studentData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Envoi des données mises à jour de l'étudiant vers l'API (remplacer l'URL par l'URL réelle)
      await axios.put(`http://localhost:8099/api/students/${studentData.id}`, studentData);
      alert('Student updated successfully.');
    } catch (error) {
      console.error('Error updating student:', error);
      alert('An error occurred while updating student.');
    }
  };

  return (
    <div className="edit-student-container">
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit} className="edit-student-form">
        {/* Les champs du formulaire */}
        <div className="form-group">
          <label htmlFor="nom">Name</label>
          <input
            type="text"
            className="form-control"
            id="nom"
            name="nom"
            value={studentData.nom}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={studentData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="classeId">Class</label>
          <select
            className="form-control"
            id="classeId"
            name="classeId"
            value={studentData.classeId}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a Class</option>
            {classes.map((classe) => (
              <option key={classe.id} value={classe.id}>{classe.nom}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default EditStudent;
