import { useEffect, useState } from 'react';
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

  // función para redirigir al formulario con los datos de la campaña
  const handleInscribirse = (campaña) => {
    navigate('/inscripcion', {
      state: {
        fechaCampaña: campaña.fecha_campana,
        tituloCampaña: campaña.titulo_campana
      }
    });
  };

const editarCampana = async (id) => {
  const campaña = data.find((c) => c.id === id);
  if (!campaña) {
    console.error("Campaña no encontrada");
    return;
  }

  const fechaCompleta =
    nuevaFecha && nuevaHora
      ? `${nuevaFecha}T${nuevaHora}:00`
      : campaña.fecha_campana;

  const objEditado = {
    titulo_campana: nuevoTitulo || campaña.titulo_campana,
    descripcion_campana: nuevaDescripcion || campaña.descripcion_campana,
    fecha_campana: fechaCompleta,
    ubicacion_campana: nuevaUbicacion || campaña.ubicacion_campana,
    comunidad: campaña.comunidad,
  };

  try {
    await putData(`api/actualizar_campana/${id}/`, objEditado);
    const nuevas = await getData("api/crear_campana/");
    setData(nuevas);
    setSelectedCampaignId(null); 
  } catch (err) {
    console.error("Error actualizando campaña:", err);
    alert("No se pudo actualizar la campaña.");
  }
};

  // función para eliminar campaña haciendo DELETE al backend
  const eliminarCampana = async (id) => {
    const peticion = await deleteData(`api/eliminar_campana/${id}/`);
    console.log("Respuesta de eliminar campaña:", peticion);
  };

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

            {/* botón para ir a inscripción con los datos de la campaña */}
            <Button className="card-btn" onClick={() => handleInscribirse(campaña)}>Inscríbete</Button>

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

export default Cards;
