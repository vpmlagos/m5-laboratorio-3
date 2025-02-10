import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ServicioItem from '../components/ServiceItem';
import PropTypes from 'prop-types';
import WelcomeCarousel from '../components/WelcomeCarousel';
import { Container, Alert, Button } from 'react-bootstrap';

const API_URL = "http://demo5081911.mockable.io/services";

const Home = () => {
    const [servicios, setServicios] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const serviciosRef = useRef(null);
    const infoRef = useRef(null);
  
    const scrollToSection = (ref) => {
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth' });
      }
    };
  
    const obtenerServicios = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(API_URL);
        setServicios(response.data);
      } catch (error) {
        setError('Error al obtener los datos. Intente nuevamente más tarde.');
        console.error('Error fetching servicios:', error);
      }
      setLoading(false);
    };
  
    useEffect(() => {
      obtenerServicios();
    }, []);
  
    return (
      <Container>
        <nav>
          <button onClick={() => scrollToSection(infoRef)}>Información del Hospital</button>
          <button onClick={() => scrollToSection(serviciosRef)}>Servicios Destacados</button>
        </nav>
        <WelcomeCarousel />
        <section ref={serviciosRef}>
          <h2>Servicios Destacados</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Button onClick={obtenerServicios} disabled={loading}>
            {loading ? 'Cargando...' : 'Recargar Servicios'}
          </Button>
          <ul>
            {servicios.length === 0 && !loading ? (
              <p>No hay servicios disponibles.</p>
            ) : (
              servicios.map((servicio) => <ServicioItem key={servicio.id} servicio={servicio} />)
            )}
          </ul>
        </section>
      </Container>
    );
  };

  Home.propTypes = {
    servicios: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        nombre: PropTypes.string.isRequired,
      })
    ),
  };
  
  export default Home;
