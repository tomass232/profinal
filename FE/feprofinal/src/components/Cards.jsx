import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../styles/cards.css';
import { deleteData, putData } from '../servicios/fetch';

function Cards({ data }) {

  const [selectedCampaignId, setSelectedCampaignId] = useState(null);

  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [nuevaDescripcion, setNuevaDescripcion] = useState('');
  const [nuevaFecha, setNuevaFecha] = useState('');
  const [nuevaUbicacion, setNuevaUbicacion] = useState('');

  const editarCampana = async (id) => {
    const objEditado = {
      titulo_campana: nuevoTitulo,
      descripcion_campana: nuevaDescripcion,
      fecha_campana: nuevaFecha,
      ubicacion_campana: nuevaUbicacion
    };
    const respuesta = await putData(`api/actualizar_campana/${id}/`, objEditado);
    console.log("Respuesta de editar campaña:", respuesta);
  };

  const eliminarCampana = async (id) => {
    const peticion = await deleteData(`api/eliminar_campana/${id}/`);
    console.log("Respuesta de eliminar campaña:", peticion);
  }

  return (
    <div className="cards-container">
      {data.map((campaña, index) => (
        <Card className="card" key={index}>
          <Card.Img
            className="card-img"
            variant="top"
            src={campaña.imagen || 'https://via.placeholder.com/300x200'}
          />
          <Card.Body className="card-body">
            <Card.Text>
              {campaña.titulo_campana}
            </Card.Text>
            <Card.Text>
              {campaña.descripcion_campana}
              {campaña.fecha_campana}
              {campaña.ubicacion_campana}
            </Card.Text>
            <Link to="/inscripcion">
            <Button className="card-btn" >Inscríbete</Button>
            </Link>
            <Button className="card-btn" onClick={() => eliminarCampana(campaña.id)} >Eliminar</Button>
            <Button className="card-btn" onClick={() => setSelectedCampaignId(campaña.id)}>Editar</Button>
            {
              selectedCampaignId === campaña.id && (
                <>
                <Form className="form-crear-campaña">
                     <Form.Group className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Nuevo título"
                    value={nuevoTitulo}
                    onChange={(e) => setNuevoTitulo(e.target.value)}
                    />
                    </Form.Group>
                    <Form.Group className="mb-2"> 
                  <Form.Control
                    className="mt-2"
                    type="text"
                    placeholder="Nueva descripción"
                    value={nuevaDescripcion}
                    onChange={(e) => setNuevaDescripcion(e.target.value)}
                    />
                    </Form.Group>
                       <Form.Group className="mb-2"> 
                  <Form.Control
                    className="mt-2"
                    type="date"
                    placeholder="Nueva fecha"
                    value={nuevaFecha}
                    onChange={(e) => setNuevaFecha(e.target.value)}
                    />
                    </Form.Group>
                       <Form.Group className="mb-2"> 
                  <Form.Control
                    className="mt-2"
                    type="text"
                    placeholder="Nueva ubicación"
                    value={nuevaUbicacion}
                    onChange={(e) => setNuevaUbicacion(e.target.value)}
                    />
                    </Form.Group>
                  <Button
                    className="btn"
                    onClick={() => editarCampana(campaña.id)}
                    >
                    Guardar cambios
                  </Button>
                    </Form>
                </>
              )
            }
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Cards;

