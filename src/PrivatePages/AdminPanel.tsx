import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../styles/AdminPanel.css';


const AdminPanel = () => {
    const navigate = useNavigate(); 
    const { isAuthenticated, role, logout } = useAuth();
    if (!isAuthenticated || role !== 'Admin') {
        return <Navigate to="/login" replace />;
    }

    return (
        <Container className="contenedorAdminPanel">
            <Row className="d-flex align-items-center mb-5">
                <Col xs="auto" className="d-flex align-items-center">
                    <img
                        src="https://ui-avatars.com/api/?name=Admin&background=179fcd&color=fff&size=128"
                        alt="Perfil Admin"
                        className="user-greeting__avatar"
                    />
                </Col>
                <Col>
                    <h1 className="user-greeting__text">¡Bienvenido, Admin!</h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <h2>Panel de Administrador</h2>
                        </Card.Header>
                        <Card.Body>
                            <p>Aquí puedes gestionar el equipo médico, registro de pacientes y más.</p>
                            <Button variant="primary" onClick={() => navigate('/admin-panel/gestion/medicos')}>
                                Gestionar Equipo Médico
                            </Button>
                            <Button variant="secondary" onClick={() => alert('Registro de Pacientes')}>
                                Registro de Pacientes
                            </Button>
                            <Button variant="danger" onClick={logout}>
                                Cerrar sesión
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminPanel;
