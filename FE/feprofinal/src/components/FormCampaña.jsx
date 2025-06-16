import { useEffect, useState } from 'react';
import { getData } from '../servicios/fetch';
import Cards from '../components/Cards.jsx';

function Campaña() {
  const [campañas, setCampañas] = useState([]);


  return (
    <div>
      <h2 style={{ textAlign: 'center', margin: '20px 0' }}>Campañas disponibles</h2>
      <Cards data={campañas} />
    </div>
  );
}

export default Campaña;
