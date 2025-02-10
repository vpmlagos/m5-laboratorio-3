import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/DoctorCard.css';

const DoctorCard = ({ doctor }) => (
  <Link to={`/cita`} className="text-decoration-none">
  <Card className="mb-3 cardDoctor">
    <Card.Img className='cardImage' variant="top" src={doctor.imagen} alt={`Imagen de ${doctor.nombre}`} />
    <Card.Body>
      <Card.Title>{doctor.nombre}</Card.Title>
      <Card.Text>Especialidad: {doctor.especialidad}</Card.Text>
    </Card.Body>
  </Card>
  </Link>
);

DoctorCard.propTypes = {
  doctor: PropTypes.shape({
    id: PropTypes.number.isRequired,
    imagen: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    especialidad: PropTypes.string.isRequired,
  }).isRequired, 
};

export default DoctorCard;
