import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../styles/CarouselStyle.css'

const WelcomeCarousel = () => (
  <Carousel data-bs-theme="dark">
    <Carousel.Item>
      <img
        className="d-block w-100 rounded"
        src="/img/home-welcome.jpg" 
        alt="First slide"
      />
      <Carousel.Caption>
        <h3>Siempre cerca de ti</h3>
        <p>Cuando más nos necesitas</p>
        <Button as={Link} to="/cita" variant="primary">
          Reserva tu cita
        </Button>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100 rounded"
        src="/img/excelencia.jpg" 
        alt="Second slide"
      />
      <Carousel.Caption>
        <h3>Con los mejores especialistas</h3>
        <p>Tu salud es nuestra prioridad</p>
        <Button as={Link} to="/equipo" variant="primary">
          Elige tu especialidad
        </Button>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100 rounded"
        src="/img/home-welcome.jpg"
        alt="Third slide"
      />
      <Carousel.Caption>
        <h3>Clínica Hoffen</h3>
        <p>Salud y Vida</p>
        <Button as={Link} to="/contacto" variant="primary">
          Escríbenos
        </Button>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
);

export default WelcomeCarousel;