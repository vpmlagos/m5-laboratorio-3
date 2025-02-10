import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import '../styles/DateForm.css';

const initialFormState = {
  name: '',
  date: '',
  time: '',
  rut: '',
  specialty: '',
};

const TIME_SLOTS = {
  Mañana: ['09:00', '10:00', '11:00'],
  Tarde: ['15:00', '16:00', '17:00'],
};

const DateForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState('');
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const validateForm = useCallback(() => {
    const { name, date, time, rut, specialty } = formData;

    if (!name || !date || !time || !rut || !specialty) {
      return 'Todos los campos son obligatorios.';
    }

    const rucRegex = /^\d{11}$/;
    if (!rucRegex.test(rut)) {
      return 'El RUT debe tener 11 dígitos.';
    }

    const today = new Date().toISOString().split('T')[0];
    if (date < today) {
      return 'La fecha no puede ser anterior a hoy.';
    }

    return ''; // Sin errores
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    onSubmit(formData);
    setFormData(initialFormState);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="contenedorCita">
      <h1 className="citaTitle">Agenda tu cita:</h1>
      <br />
      <Form onSubmit={handleSubmit}>
        {/* Nombre */}
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="name"
            ref={nameInputRef}
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Ingresa tu nombre"
            aria-label="Nombre completo"
          />
        </Form.Group>

        {/* Fecha */}
        <Form.Group className="mb-3" controlId="formDate">
          <Form.Label>Fecha</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            min={new Date().toISOString().split('T')[0]}
            aria-label="Fecha de la cita"
          />
        </Form.Group>

        {/* Hora */}
        <Form.Group className="mb-3" controlId="formTime">
          <Form.Label>Hora</Form.Label>
          <Form.Control
            as="select"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            aria-label="Hora de la cita"
          >
            <option value="">Selecciona un turno</option>
            {Object.entries(TIME_SLOTS).map(([period, times]) => (
              <optgroup key={period} label={period}>
                {times.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </optgroup>
            ))}
          </Form.Control>
        </Form.Group>

        {/* RUT */}
        <Form.Group className="mb-3" controlId="formRut">
          <Form.Label>RUT</Form.Label>
          <Form.Control
            type="text"
            name="rut"
            value={formData.rut}
            onChange={handleInputChange}
            placeholder="Ingresa tu RUT (11 dígitos)"
            aria-label="RUT del usuario"
          />
        </Form.Group>

        {/* Especialidad */}
        <Form.Group className="mb-3" controlId="formSpecialty">
          <Form.Label>Especialidad</Form.Label>
          <Form.Control
            as="select"
            name="specialty"
            value={formData.specialty}
            onChange={handleInputChange}
            aria-label="Especialidad médica"
          >
            <option value="">Selecciona una especialidad</option>
            <option value="Cardiología">Cardiología</option>
            <option value="Dermatología">Dermatología</option>
            <option value="Pediatría">Pediatría</option>
            <option value="Odontología">Odontología</option>
          </Form.Control>
        </Form.Group>

        {/* Mostrar error si es necesario */}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Botón de envío */}
        <Button variant="primary" type="submit">
          Agendar
        </Button>
      </Form>
    </div>
  );
};

export default DateForm;
