import React from 'react';
import { Container, Nav, NavItem, NavLink } from 'react-bootstrap';
import '../styles/FooterStyle.css';

const Footer = () => (
  <footer className="bg-light">
    <Container className='footerContainer'>
      <Nav className="footerText">
        <NavItem>
          <NavLink href="/" className="text-muted">Inicio</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/medical-team" className="text-muted">Equipo Médico</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/contacto" className="text-muted">Contacto</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/login" className="text-muted">Inicia sesión</NavLink>
        </NavItem>
      </Nav>

      {/* Copyright */}
      <p className="text-center text-muted">© 2025 Clínica Hoffen. Todos los derechos reservados.</p>
    </Container>
  </footer>
);

export default Footer;