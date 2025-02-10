import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, NavbarToggle, NavbarCollapse } from 'react-bootstrap';
import { FaHome, FaUsers, FaCalendarAlt, FaUserShield } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import '../styles/HeaderStyle.css';

const Header = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <Navbar className='headerContainer' expand="lg" fixed="top">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img src="/img/logohoffen.png" alt="Clínica Hoffen" className="img-fluid" />
                </Navbar.Brand>

                {/* Botón hamburguesa para dispositivos pequeños */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <NavbarCollapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/" className="me-3">
                            <FaHome className="me-2" /> Inicio
                        </Nav.Link>
                        <Nav.Link as={Link} to="/equipo" className="me-3">
                            <FaUsers className="me-2" /> Equipo Médico
                        </Nav.Link>
                        <Nav.Link as={Link} to="/cita">
                            <FaCalendarAlt className="me-2" /> Citas
                        </Nav.Link>

                        {isAuthenticated && (
                            <>
                                <Nav.Link as={Link} to="/admin-panel">
                                    <FaUserShield className="me-2" /> Panel de Admin
                                </Nav.Link>
                                <Nav.Link as={Link} to="/login" onClick={logout}>
                                    <FaUserShield className="me-2" /> Cerrar sesión
                                </Nav.Link>
                            </>
                        )}

                        {!isAuthenticated && (
                            <Nav.Link as={Link} to="/login">
                                <FaUserShield className="me-2" /> Iniciar sesión
                            </Nav.Link>
                        )}
                    </Nav>
                </NavbarCollapse>
            </Container>
        </Navbar>
    );
};

export default Header;