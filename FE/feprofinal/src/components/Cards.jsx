import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../styles/cards.css'; 

function Cards({ data }) {
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
            <Button className="card-btn">Inscríbete</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Cards;
