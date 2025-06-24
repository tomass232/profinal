import { useEffect, useState } from 'react';
import { getData } from '../servicios/fetch';
import AggCampania from '../components/AggCampania';

function Campaña() {
  const [campañas, setCampañas] = useState([]);

 /*campana edit disfunct*/
  return (
    <div>
      <AggCampania />
    </div>
  );  
}

export default Campaña;
