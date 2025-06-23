import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../styles/cards.css';
import { deleteData, putData, getData } from '../servicios/fetch';

function Cards() {

  // estado para saber cuál campaña está seleccionada para editar
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const navigate = useNavigate(); // para navegar a otra ruta programáticamente
  const [data, setData] = useState([]) // estado para guardar la lista de campañas
  // estados para los nuevos valores al editar una campaña
  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [nuevaDescripcion, setNuevaDescripcion] = useState('');
  const [nuevaFecha, setNuevaFecha] = useState('');
  const [nuevaHora, setNuevaHora] = useState('');
  const [nuevaUbicacion, setNuevaUbicacion] = useState('');

  // función para editar campaña haciendo PUT al backend
  const editarCampana = async (id) => {
    const objEditado = {
      titulo_campana: nuevoTitulo,
      descripcion_campana: nuevaDescripcion,
      fecha_campana: nuevaFecha,
      hora_campana: nuevaHora,
      ubicacion_campana: nuevaUbicacion
    };
    const respuesta = await putData(`api/actualizar_campana/${id}/`, objEditado);
    console.log("Respuesta de editar campaña:", respuesta);

    // esta función está dentro de editarCampana, parece un error pero no la toco
    const handleInscripcion = (id) => {
      setSelectedCampaignId(id);
      console.log("Campaña seleccionada:", id);

      localStorage.setItem('selectedCampaign', id);

      navigate('/inscripcion');
    };
  }

  // función para eliminar campaña haciendo DELETE al backend
  const eliminarCampana = async (id) => {
    const peticion = await deleteData(`api/eliminar_campana/${id}/`);
    console.log("Respuesta de eliminar campaña:", peticion);
  }

  // hook que se ejecuta cuando el componente se monta
  useEffect(() => {
    console.log("Componente Cards montado");
    const traeCampanas = async () => {
      const peticion = await getData('api/crear_campana/');
      console.log("Datos de campañas:", peticion);
      setData(peticion); // guardo la lista de campañas en el estado
    }
    traeCampanas();
  }, []);

  return (
    <div className="cards-container">
      {/* mapeo cada campaña para mostrarla */}
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
              {campaña.hora_campana}
              <br />
              {campaña.ubicacion_campana}
              <br />
            </Card.Text>
            {/* botón para ir a inscripción */}
            <Link to="/inscripcion">
              <Button className="card-btn" >Inscríbete</Button>
            </Link>
            {/* botón para eliminar campaña */}
            <Button className="card-btn" onClick={() => eliminarCampana(campaña.id)} >Eliminar</Button>
            {/* botón para mostrar formulario de edición */}
            <Button className="card-btn" onClick={() => setSelectedCampaignId(campaña.id)}>Editar</Button>

            {/* formulario que aparece solo si la campaña está seleccionada para editar */}
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
                        type="time"
                        placeholder="Nueva hora"
                        value={nuevaHora}
                        onChange={(e) => setNuevaHora(e.target.value)}
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
                    {/* botón para enviar la edición */}
                    <Button
                      className="card-btn"
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
