import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Alert,  
} from "react-bootstrap";

const API_URL_MEDICOS = "https://demo5081911.mockable.io/medicos";

const DoctorsManagement = () => {
  // Obtener el estado de autenticación y el rol del usuario
  const { isAuthenticated, role } = useAuth();
  
  // Redirigir si no está autenticado o no tiene rol de Admin
  if (!isAuthenticated || role !== "Admin") {
    return <Navigate to="/login" replace />;
  }

  // Estado para manejar la lista de médicos y otros estados relacionados
  const [equipoMedico, setEquipoMedico] = useState([]);
  const [filtrado, setFiltrado] = useState([]);
  const [error, setError] = useState(null); 
  const [doctor, setDoctor] = useState({ nombre: "", especialidad: "" });
  const [doctorsList, setDoctorsList] = useState([]);
  const [formError, setFormError] = useState("");

  // useEffect para obtener datos de médicos cuando se monta el componente
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const responseMedicos = await fetch(API_URL_MEDICOS);
        if (!responseMedicos.ok) {
          throw new Error("Error al obtener médicos");
        }
        const resultMedicos = await responseMedicos.json();
        setEquipoMedico(resultMedicos);
        setFiltrado(resultMedicos);
        setError(null); // Resetear error si la petición fue exitosa
      } catch (error) {
        console.error("Error al obtener datos:", error);
        setError("No se pudo cargar la lista de médicos. Intente nuevamente.");
      }
    };

    obtenerDatos(); // Llamada inicial a la API

    // Configuración del intervalo para actualizar datos cada 10 segundos
    const interval = setInterval(() => {
      obtenerDatos();
      console.log("Datos actualizados satisfactoriamente");
    }, 10 * 1000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []); // [] asegura que el efecto solo se ejecute una vez al montarse el componente

  // Manejar cambios en el formulario de agregar médico
  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  // Manejar la adición de un nuevo médico a la lista
  const handleAddDoctor = (e) => {
    e.preventDefault();
    if (!doctor.nombre || !doctor.especialidad) {
      setFormError("Ambos campos (Nombre y Especialidad) son requeridos.");
      return;
    }
    setFormError(""); // Resetear error si la validación es exitosa
    setDoctorsList([...doctorsList, doctor]);
    setDoctor({ nombre: "", especialidad: "" });
  };

  return (
    <Container className="contenedorDoctorsManagement">
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h2>Gestión de Médicos</h2>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleAddDoctor}>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        type="text"
                        name="nombre"
                        value={doctor.nombre}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Especialidad</Form.Label>
                      <Form.Control
                        type="text"
                        name="especialidad"
                        value={doctor.especialidad}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary" type="submit" className="mt-3">
                  Agregar Médico
                </Button>
                {formError && <Alert variant="danger" className="mt-3">{formError}</Alert>}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Mostrar error de la API */}
      {error && (
        <Row className="mt-4">
          <Col>
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      )}

      {/* Lista de médicos obtenida de la API */}
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Header>
              <h3>Médicos Disponibles</h3>
            </Card.Header>
            <Card.Body>
              {equipoMedico.length === 0 ? (
                <p>Cargando médicos...</p>
              ) : (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Especialidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtrado.map((medico, index) => (
                      <tr key={index}>
                        <td>{medico.nombre}</td>
                        <td>{medico.especialidad}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Lista de médicos agregados manualmente */}
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Header>
              <h3>Médicos Agregados Manualmente</h3>
            </Card.Header>
            <Card.Body>
              {doctorsList.length === 0 ? (
                <p>No hay médicos registrados aún.</p>
              ) : (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Especialidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctorsList.map((doc, index) => (
                      <tr key={index}>
                        <td>{doc.nombre}</td>
                        <td>{doc.especialidad}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorsManagement;
