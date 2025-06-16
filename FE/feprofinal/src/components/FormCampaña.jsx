import { useEffect, useState } from 'react';
import { obtenerCampañas } from '../servicios/fetch';
import { getData } from '../servicios/fetch';
import Cards from '../components/Cards.jsx';

function Campaña() {
  const [campañas, setCampañas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData('api/crear_campana');
      setCampañas(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: 'center', margin: '20px 0' }}>Campañas disponibles</h2>
      <Cards data={campañas} />
    </div>
  );
}

export default Campaña;
