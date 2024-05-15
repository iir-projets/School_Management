import  { useState, useEffect } from "react";
import axios from "axios";
import { Button, Typography } from "@mui/material";
import PropTypes from "prop-types";

const StudentData = ({ students }) => (
  <div>
    {students.map((student, index) => (
      <div key={index}>
        <Typography variant="body1">{`Nom: ${student.nom}, Prénom: ${student.prenom}, Moyenne: ${student.moyenne}`}</Typography>
      </div>
    ))}
  </div>
);

StudentData.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      nom: PropTypes.string.isRequired,
      prenom: PropTypes.string.isRequired,
      moyenne: PropTypes.number.isRequired
    })
  ).isRequired
};

const ReportGenerator = () => {
  const [studentData, setStudentData] = useState([]);
  const [reportGenerated] = useState(false);

  useEffect(() => {
    // Appel à la fonction pour récupérer les données des étudiants au chargement du composant
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      // Effectuer une requête HTTP GET pour récupérer les données des étudiants depuis le backend
      const response = await axios.get("http://votre-serveur-backend/api/etudiants");
      // Mettre à jour l'état avec les données des étudiants récupérées depuis le backend
      setStudentData(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données des étudiants :", error);
    }
  };

  const generatePDFReport = () => {
    // Utilisation des données récupérées du backend pour générer le rapport PDF
    // Le reste du code reste inchangé
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4">Génération de Rapports</Typography>
      {!reportGenerated ? (
        <Button variant="contained" color="primary" onClick={generatePDFReport} style={{ marginTop: "20px" }}>
          Générer le rapport PDF
        </Button>
      ) : (
        <div>
          <Typography variant="h5" style={{ marginTop: "20px" }}>Rapport Généré</Typography>
          <Typography variant="body1">Le rapport a été généré avec succès.</Typography>
          <StudentData students={studentData} />
        </div>
      )}
    </div>
  );
};

export default ReportGenerator;
