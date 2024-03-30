
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Nave from '../Nav';
import "../Doctors/doctor.css"

const Doctors = () => {
  const [head, setHead] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchHead = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/getHeadByName/${id}`);
        setHead(response.data);
      } catch (error) {
        console.error("Error fetching department head:", error);
        // Handle error, display error message to the user, etc.
      }
    };

    fetchHead();
  }, [id]);

  if (!head) {
    return <div>Loading department head...</div>;
  }

  return (
    <div style={{ background: 'white', height: '100vh' }}>
      <Nave />


      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>
        <div>    <h2 style={{ marginTop: "4.5rem", color: 'black', fontWeight: '600', textAlign: 'center' }}>Doctor</h2></div>


        <div class="cards" style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center', alignItems: "center", columnGap: '2rem' }} >
          <img className="cards-img-top img-fluid" src={`http://localhost:4001/${head.image}`} alt={`Department ${head._id}`} style={{ maxWidth: "550px", maxHeight: "650px", borderRadius: '2rem' }} />

          <div class="cards__content">
            <h4 style={{ fontSize: '20px' }} className="cards-title">Department:{head.department}</h4>
            <h4 style={{ fontSize: '20px' }} className="cards-text">Employee Number: {head.email}</h4>
            <h4 style={{ fontSize: '20px' }} className="cards-text">Employee Age: {head.age}</h4>
            <h4 style={{ fontSize: '20px' }} className="cards-text">Description:{head.description}</h4>


          </div>

        </div>
        <div> <h2 style={{ textAlign: 'center', fontSize: '40px', fontWeight: '500', marginTop: '1rem' }} className="card-title">{head.name}</h2></div>





      </div>

    </div>
  );
};

export default Doctors;

