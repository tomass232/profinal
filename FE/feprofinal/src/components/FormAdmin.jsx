import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import { putData } from '../servicios/fetch'; // usamos tu función existente
import '../styles/admin.css';

function FormAdmin() {
  // estado para guardar la lista de usuarios inscritos
  const [usuariosInscritos, setUsuariosInscritos] = useState([]);

  // estado para guardar la lista de solicitudes de inscripción
  const [solicitudesInscripcion, setSolicitudesInscripcion] = useState([]);

  const [editingUserId, setEditingUserId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');


  // base URL del backend para las peticiones
  const BASE_URL = 'http://localhost:8000';


  // useEffect para cargar los datos cuando el componente se monta
  useEffect(() => {
    // traer usuarios inscritos
    fetch(`${BASE_URL}/api/mostrar_usuarios/`)
      .then((r) => r.json())
      .then(setUsuariosInscritos)
      .catch((error) => console.error('Error:', error));

    // traer solicitudes de inscripción
    fetch(`${BASE_URL}/api/crear_participaciones/`)
      .then((r) => r.json())
      .then(setSolicitudesInscripcion)
      .catch((error) => console.error('Error:', error));
  }, []);

  const handleEditar = (id, username, email) => {
    setEditingUserId(id);
    setEditedName(username);
    setEditedEmail(email);
  };

  const handleGuardar = async (id) => {
    try {
      await putData(`api/actualizar_usuario/${id}/`, {
        username: editedName,
        email: editedEmail,
      });
      const actualizados = usuariosInscritos.map((u) =>
        u.id === id ? { ...u, username: editedName, email: editedEmail } : u
      );
      setUsuariosInscritos(actualizados);
      setEditingUserId(null);
    } catch (error) {
      console.error('Error al guardar usuario:', error);
    }
  };

  const handleEliminar = async (id, isSolicitud = false) => {
    const url = isSolicitud
      ? `${BASE_URL}/api/crear_participaciones/${id}/`
      : `${BASE_URL}/api/eliminar_usuario/${id}/`;

    try {
      const response = await fetch(url, { method: 'DELETE' });
      if (!response.ok) throw new Error('Error al eliminar');
      if (isSolicitud) {
        setSolicitudesInscripcion((prev) => prev.filter((i) => i.id !== id));
      } else {
        setUsuariosInscritos((prev) => prev.filter((u) => u.id !== id));
      }
    } catch (error) {
      console.error('Error eliminando:', error);
    }
  };

  return (
    <Container fluid className="admin-container">
      <Row className="admin-header">
        <Col><h1>Panel de Administración</h1></Col>
      </Row>

      
      <Row className="mb-4">
        <Col>
          <Card className="admin-card full-width-card">
            <Card.Header className="admin-card-header">Usuarios inscritos</Card.Header>
            <Card.Body className="admin-card-body">
              {usuariosInscritos.length > 0 ? (
                <Table className="admin-table" responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Correo</th>
                      <th>Fecha</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuariosInscritos.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>
                          {editingUserId === user.id ? (
                            <input
                              value={editedName}
                              onChange={(e) => setEditedName(e.target.value)}
                            />
                          ) : (
                            user.username
                          )}
                        </td>
                        <td>
                          {editingUserId === user.id ? (
                            <input
                              value={editedEmail}
                              onChange={(e) => setEditedEmail(e.target.value)}
                            />
                          ) : (
                            user.email
                          )}
                        </td>
                        <td>{new Date(user.date_joined).toLocaleString()}</td>
                        <td className="td-actions">
                          {editingUserId === user.id ? (
                            <button className="btoneditar" onClick={() => handleGuardar(user.id)}>
                              Guardar
                            </button>
                          ) : (
                            <button
                              className="btoneditar"
                              onClick={() => handleEditar(user.id, user.username, user.email)}
                            >
                              Editar
                            </button>
                          )}
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

     
      <Row>
        <Col>
          <Card className="admin-card full-width-card">
            <Card.Header className="admin-card-header">Solicitudes de inscripción</Card.Header>
            <Card.Body className="admin-card-body">
              {solicitudesInscripcion.length > 0 ? (
                <Table className="admin-table" responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Correo</th>
                      <th>Fecha</th>
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
                          <button className="btoneditar" onClick={() => console.log('Aceptar')}>
                            Aceptar
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
                <p className="admin-message">No hay solicitudes de inscripción.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default FormAdmin;
