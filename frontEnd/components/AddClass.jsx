import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


function AddClass() {
  const [nom, setNom] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envoie des données du formulaire au backend
      await axios.post('http://localhost:8099/api/classes', {
        nom: nom
      });
      // Affiche un message de succès
      setMessage('La classe a été ajoutée avec succès.');
      // Réinitialise le formulaire
      setNom('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la classe :', error);
      // Affiche un message d'erreur
      setMessage('Une erreur s\'est produite lors de l\'ajout de la classe.');
    }
  };

  return (
    <div className="container">
      <h2>Ajouter une classe</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nom" className="form-label">Nom de la classe</label>
          <input
            type="text"
            className="form-control"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Ajouter</button>
      </form>
      {message && <div className="mt-3">{message}</div>}
    </div>
  );
}

export default AddClass;
