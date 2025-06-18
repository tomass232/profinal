 import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../styles/cards.css';

function Cards({ data }) {

  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const navigate = useNavigate();

  const handleInscripcion = (id) => {
    setSelectedCampaignId(id);
    console.log("Campaña seleccionada:", id);

   
    localStorage.setItem('selectedCampaign', id);

    
    navigate('/inscripcion');
  };

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
            <Button className="card-btn" >Inscríbete</Button>
            <Button className="card-btn" onClick={()=>eliminarCampana(campaña.id)} >Eliminar</Button>
            <Button
              className="card-btn"
              onClick={() => handleInscripcion(campaña.id)}>
              Inscríbete
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Cards;
