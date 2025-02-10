import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import "../styles/Banner.css"

const Banner = () => {
  return (
    <section className="banner-card position-relative text-center shadow-lg rounded">
      <img
        src="/img/excelencia.jpg"
        alt="Imagen de la clínica"
        className="img-fluid rounded opacity-55 banner-image"
      />
      <div className="banner-content position-absolute top-50 start-50 translate-middle p-3">
        <h2 className="text-white fw-bold">
          Conoce a nuestros especialistas
        </h2>
        <Button variant="light" href="/cita">
          Agenda tu cita
        </Button>
      </div>
    </section>
  );
};

export default Banner;
