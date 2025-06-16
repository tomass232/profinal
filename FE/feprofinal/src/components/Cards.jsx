import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import '../styles/cards.css'; 
import { useNavigate } from 'react-router-dom';
import { deleteData } from '../servicios/fetch';
import {putData} from '../servicios/fetch';
function Cards({ data }) {
  const navigate = useNavigate()

  const eliminarCampana = async (id) =>{
    const peticio = await deleteData(`api/eliminar_campana/${id}/`);
    console.log(peticio);
    
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
            <Button className="card-btn" >Inscríbete</Button>
            <Button className="card-btn" onClick={()=>eliminarCampana(campaña.id)} >Eliminar</Button>

          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Cards;
