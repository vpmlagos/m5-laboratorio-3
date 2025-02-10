import React, { useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import DateForm from "../components/DateForm";

const Appointments = () => {
  const [message, setMessage] = useState('');

  const handleFormSubmit = (formData) => {
    setMessage(`Cita agendada para ${formData.name} en la fecha ${formData.date} a las ${formData.time}`);
  };

  return (
    <Container className="mt-5">

      {message && <Alert variant="success">{message}</Alert>}

      <DateForm onSubmit={handleFormSubmit} />
        {/* MAPS */}
            
              <iframe
                width="100%"
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Malet%20St,%20London%20WC1E%207HU,%20United%20Kingdom+(Your%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              >
                <a href="https://www.gps.ie/sport-gps/">fitness tracker</a>
              </iframe>
            
    </Container>
    
  );
};

export default Appointments;
