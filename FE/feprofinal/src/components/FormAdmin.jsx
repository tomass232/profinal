import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import '../styles/admin.css';

function FormAdmin() {
  // estado para guardar la lista de usuarios inscritos
  const [usuariosInscritos, setUsuariosInscritos] = useState([]);

  // estado para guardar la lista de solicitudes de inscripción
  const [solicitudesInscripcion, setSolicitudesInscripcion] = useState([]);

  // base URL del backend para las peticiones
  const BASE_URL = 'http://localhost:8000';

  // useEffect para cargar los datos cuando el componente se monta
  useEffect(() => {
    // traer usuarios inscritos
    fetch(`${BASE_URL}/api/mostrar_usuarios/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al cargar usuarios');
        }
        return response.json();
      })
      .then((data) => {
        setUsuariosInscritos(data); // guardo los usuarios en el estado
      })
      .catch((error) => console.error('Error:', error));

    // traer solicitudes de inscripción
    fetch(`${BASE_URL}/api/crear_participaciones/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al cargar solicitudes de inscripción');
        }
        return response.json();
      })
      .then((data) => {
        setSolicitudesInscripcion(data); // guardo las solicitudes en el estado
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  // función para editar, por ahora solo imprime el id y si es solicitud o usuario
  const handleEditar = (id, isSolicitud = false) => {
    console.log('Editar', isSolicitud ? 'solicitud' : 'usuario', 'con id:', id);
  };

  // función para eliminar tanto usuarios como solicitudes
  const handleEliminar = (id, isSolicitud = false) => {
    // si es solicitud uso una ruta, si es usuario otra
    const url = isSolicitud
      ? `${BASE_URL}/api/mostrar_usuarios/${id}/`
      : `${BASE_URL}/api/eliminar_usuario/${id}/`;

    fetch(url, { method: 'DELETE' })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al eliminar el registro');
        }
        // actualizo el estado para eliminar el elemento borrado de la tabla
        if (isSolicitud) {
          setSolicitudesInscripcion((prev) => prev.filter((item) => item.id !== id));
        } else {
          setUsuariosInscritos((prev) => prev.filter((user) => user.id !== id));
        }
      })
      .catch((error) => console.error('Error eliminando registro:', error));
  };

  return (
    <Container fluid className="admin-container">
      <Row className="admin-header">
        <Col>
          <h1>Panel de Administración</h1>
        </Col>
      </Row>

      {/* tabla de usuarios inscritos */}
      <Row className="mb-4">
        <Col>
          <Card className="admin-card full-width-card">
            <Card.Header className="admin-card-header">
              Usuarios inscritos
            </Card.Header>
            <Card.Body className="admin-card-body">
              {usuariosInscritos.length > 0 ? (
                <Table className="admin-table" responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Correo</th>
                      <th>Fecha de inscripción</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuariosInscritos.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{new Date(user.date_joined).toLocaleString()}</td>
                        <td className="td-actions">
                          <button
                            className="btoneditar"
                            onClick={() => handleEditar(user.id)}
                          >
                            Editar
                          </button>
                          <button
                            className="btoneliminar"
                            onClick={() => handleEliminar(user.id)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p className="admin-message">No hay usuarios inscritos.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* tabla de solicitudes de inscripción */}
      <Row>
        <Col>
          <Card className="admin-card full-width-card">
            <Card.Header className="admin-card-header">
              Solicitudes de inscripción
            </Card.Header>
            <Card.Body className="admin-card-body">
              {solicitudesInscripcion.length > 0 ? (
                <Table className="admin-table" responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Correo</th>
                      <th>Fecha de solicitud</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {solicitudesInscripcion.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.username}</td>
                        <td>{item.email}</td>
                        <td>{new Date(item.date_joined).toLocaleString()}</td>
                        <td className="td-actions">
                          <button
                            className="btoneditar"
                            onClick={() => handleEditar(item.id, true)}
                          >
                            Editar
                          </button>
                          <button
                            className="btoneliminar"
                            onClick={() => handleEliminar(item.id, true)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p className="admin-message">
                  No hay solicitudes de inscripción.
                </p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default FormAdmin;

