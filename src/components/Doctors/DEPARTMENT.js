import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Nave from '../Nav';

const DEPARTMENT = () => {
  const [dep, setDep] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchHead = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/getDEPByName/${id}`);
        setDep(response.data);
      } catch (error) {
        console.error("Error fetching department :", error);
        // Handle error, display error message to the user, etc.
      }
    };

    fetchHead();
  }, [id]);

  if (!dep) {
    return <div>Loading department...</div>;
  }

  return (
    <div style={{background:'white' ,height:'100vh'}}>
    <Nave/>
    {/* /////////////// */}
    <div style={{display:'flex',flexDirection:'column' ,justifyContent:'center',alignContent:'center'}}>
          <div>    <h2  style={{marginTop:"4.5rem",color:'black',fontWeight:'600',textAlign:'center'}}>DEPARTMENTS</h2></div>
       
       
        <div class="cards" style={{marginTop:'4rem',display:'flex',justifyContent:'center',alignItems:"center",columnGap:'2rem'}} >
        <img  className="cards-img-top img-fluid" src={`http://localhost:4001/${dep.image}`} alt={`Department ${dep._id}`} style={{ maxWidth: "550px", maxHeight: "650px",borderRadius:'2rem' }} />
  
  <div class="cards__content">
    <h4 style={{fontSize:'20px'}} className="cards-title">Department:{dep.department}</h4>
           
            <h4 style={{fontSize:'20px'}} className="cards-text">Year Founded: {dep.year}</h4>
            <h4 style={{fontSize:'20px'}} className="cards-text">Description:{dep.description}</h4>

   
            </div>
            
            </div>
            <div> <h2  style={{textAlign:'center',fontSize:'40px',fontWeight:'500' ,marginTop:'1rem'}} className="card-title">{dep.department}</h2></div>  
           


            

            </div>
     

    </div>
   
  );
};

export default DEPARTMENT;