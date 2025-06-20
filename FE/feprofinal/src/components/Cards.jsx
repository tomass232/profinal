import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../styles/cards.css';
import { deleteData, putData,getData } from '../servicios/fetch';

function Cards() {

  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const navigate = useNavigate();
  const [data, setData] = useState([])
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
  const handleInscripcion = (id) => {
    setSelectedCampaignId(id);
    console.log("Campaña seleccionada:", id);

   
    localStorage.setItem('selectedCampaign', id);

    
    navigate('/inscripcion');
  };
  }

  const eliminarCampana = async (id) => {
    const peticion = await deleteData(`api/eliminar_campana/${id}/`);
    console.log("Respuesta de eliminar campaña:", peticion);
  }
  useEffect(() => {
    console.log("Componente Cards montado");
    const traeCampanas = async () => {
      const peticion = await getData('api/crear_campana/');
      console.log("Datos de campañas:", peticion);
      setData(peticion);
    }
    traeCampanas();
  }, []);
  return (
    <div className="cards-container">
      {data.map((campaña, index) => (
        <Card className="card" key={index}>
          <Card.Body className="card-body">
            <Card.Text>
              {campaña.titulo_campana}
            </Card.Text>
            <Card.Text>
              {campaña.descripcion_campana}
              <br />
              {campaña.fecha_campana}
              <br />
              {campaña.ubicacion_campana}
              <br />
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

export default Cards