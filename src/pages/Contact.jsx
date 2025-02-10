import React from 'react';
import { Form, Button, Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';

const ContactForm = () => {
  return (
    <main>
      <Container className="py-5">
        <Form>
          {/* Nombre */}
          <Form.Group className="mb-3" controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" placeholder="Nombre" />
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control type="email" placeholder="Tu email" />
            <Form.Text className="text-muted">
              Usaremos este email para contactarle
            </Form.Text>
          </Form.Group>

          {/* Asunto */}
          <Form.Group className="mb-3" controlId="formAsunto">
            <Form.Label>Asunto</Form.Label>
            <Form.Control type="text" placeholder="Asunto" />
          </Form.Group>

          {/* Mensaje */}
          <Form.Group className="mb-3" controlId="formMensaje">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control as="textarea" placeholder="Tu mensaje aquí" rows={3} />
          </Form.Group>

          {/* Botón de envío */}
          <div className="text-center">
            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </div>
        </Form>
      </Container>

      {/* MAPS */}
      <Container style={{ width: '100%' }}>
        <iframe
          width="100%"
          height="400"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Malet%20St,%20London%20WC1E%207HU,%20United%20Kingdom+(Your%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        >
          <a href="https://www.gps.ie/sport-gps/">fitness tracker</a>
        </iframe>
      </Container>
    </main>
  );
};

export default ContactForm;
