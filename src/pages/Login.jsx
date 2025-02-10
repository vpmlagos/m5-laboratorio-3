import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import "../styles/LoginStyle.css";

const API_BASE_URL = 'http://localhost:8080';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    usernameOrEmailError: '',
    passwordError: '',
    generalError: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [`${name}Error`]: '', generalError: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const credentials = {
      username: formData.usernameOrEmail,
      password: formData.password,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Credenciales incorrectas');
      }

      const { access_token } = await response.json();
      localStorage.setItem('token', access_token);
      const tokenPayload = JSON.parse(atob(access_token.split('.')[1]));
      const userId = tokenPayload.sub;
      const userRole = tokenPayload.role || '';
      const username = tokenPayload.username || '';

      // Crear el objeto del usuario
      const userObj = {
        id: userId,
        role: userRole,
        username,
      };

      login(userObj, access_token);

      // Navegar según el rol del usuario
      if (userRole === 'Admin') {
        navigate('/admin-panel', { replace: true });
      } else {
        navigate('/registro-pacientes', { replace: true });
      }

    } catch (error) {
      if (error instanceof Error) {
        // Error al obtener el token o datos de la API
        setErrors((prev) => ({ ...prev, generalError: error.message }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="login-container vh-70">
      <Row className="justify-content-center">
        <Col md={4}>
          <Card className="login-card">
            <h2 className="login-title">Iniciar sesión</h2>
            <Form className="login-form" onSubmit={handleSubmit}>
              <Form.Label>Correo electrónico o Usuario</Form.Label>
              <Form.Control
                type="text"
                name="usernameOrEmail"
                placeholder="Ingresa tu Correo Electrónico o Usuario"
                value={formData.usernameOrEmail}
                onChange={handleInputChange}
                isInvalid={!!errors.usernameOrEmailError}
              />
              <Form.Control.Feedback type="invalid">
                {errors.usernameOrEmailError}
              </Form.Control.Feedback>

              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Ingresa tu Contraseña"
                value={formData.password}
                onChange={handleInputChange}
                isInvalid={!!errors.passwordError}
              />
              <Form.Control.Feedback type="invalid">
                {errors.passwordError}
              </Form.Control.Feedback>

              {errors.generalError && (
                <p className="text-danger">{errors.generalError}</p>
              )}

              <Row className="justify-content-center">
                <Col md={12} className="botones-login mt-3">
                  <Button
                    className="btn-primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Ingresando...' : 'Ingresar'}
                  </Button>
                  <Link to="/register">
                    <Button className="btn-registrar">Registrarme</Button>
                  </Link>
                  <Link to="/forgot-password" className="forgot-password">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
