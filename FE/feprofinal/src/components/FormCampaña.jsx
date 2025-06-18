import { useEffect, useState } from 'react';
import { getData } from '../servicios/fetch';
import AggCampania from '../components/AggCampania';
import Cards from '../components/Cards.jsx';

function Campaña() {
  const [campañas, setCampañas] = useState([]);

 
  return (
    <div>
      <AggCampania />
      <Cards data={campañas} />
    </div>
  );  
}

export default Campaña;
