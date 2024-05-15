/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import axios from 'axios';



const AddStudentForm = () => {
  const [studentData, setStudentData] = useState({
    nom: '',
    prenom: '',
    email: '',
    dateDeNaissance: '',
    adresse: ''
  });

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
      const response = await axios.post('http://localhost:8099/api/students', studentData);
      alert('Student added successfully.');
      // Réinitialisation des champs après l'ajout réussi
      setStudentData({
        nom: '',
        prenom: '',
        email: '',
        dateDeNaissance: '',
        adresse: ''
      });
    } catch (error) {
      console.error('Error adding student:', error);
      alert('An error occurred while adding student.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nom" className="form-label">Nom</label>
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
        <div className="mb-3">
          <label htmlFor="prenom" className="form-label">Prénom</label>
          <input
            type="text"
            className="form-control"
            id="prenom"
            name="prenom"
            value={studentData.prenom}
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
            value={studentData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dateDeNaissance" className="form-label">Date de Naissance</label>
          <input
            type="date"
            className="form-control"
            id="dateDeNaissance"
            name="dateDeNaissance"
            value={studentData.dateDeNaissance}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="adresse" className="form-label">Adresse</label>
          <textarea
            className="form-control"
            id="adresse"
            name="adresse"
            value={studentData.adresse}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn">Ajouter</button>
      </form>
    </div>
  );
};

export default AddStudentForm;
