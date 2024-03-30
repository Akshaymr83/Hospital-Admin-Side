
 import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Nave from '../Nav'; 
import "./employee.css";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';


function EmployeeCard() {
  const [employee, setEmployee] = useState([]);
 
  const { id } = useParams();


  useEffect(() => {
    axios.get('http://localhost:4001/getEmployee')
    .then((res) => {
      console.log("data received", res.data);
      setEmployee(res.data.employee);
    })
    .catch((err) => {
      console.log('error fetching data', err);
    });
  }, [id]);

  ////////////////////////////////////////

  ////////////////////////////////////////


  const handleDelete = (id) => {
    axios.delete(`http://localhost:4001/deleteEmployee/${id}`)
    .then((res) => {
      console.log("deleted");
      setEmployee(employee.filter(employees => employees._id !== id)); 
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <div>
      <Nave/>
      <div className='e-background grid' style={{minHeight:'100vh'}}>
        {Array.isArray(employee) && employee.map((employees, index) => (
          <Card className='ecard' key={index}>
            <Card.Img className='Img'
              variant="top"
              src={`http://localhost:4001/${employees.image}`}
              alt={`Department ${employees.name}`}
            />
            <Card.Body>
              <Card.Text><p ><b>Name:</b>{employees.name}</p></Card.Text>
              <Card.Text><p><b>E-Number:</b>{employees.email}</p></Card.Text>
              <Card.Text><p><b>Age:</b>{employees.age}</p></Card.Text>
              {/* <Card.Text><p><b>Department:</b>:{employees.department}</p></Card.Text> */}
              {/* Pass the department name and report to Doctor component */}
              <Link to={`/DEPARTMENT/${employees.department}`} style={{color:'#3ba9a9'}}>
              <p className="card-title m-2">Department: {employees.department}</p>
              </Link>

              <Link to={`/doctors/${employees.report}`} style={{color:'#3ba9a9'}}>
              <p className="card-title m-2">Report to: {employees.report}</p>
              </Link>
            
        
             
              <Card.Text><p><b>Description:</b>{employees.description}</p></Card.Text>
              <Link to={`/updateEmployee/${employees._id}`}><Button variant="primary">Update</Button></Link>
              <Button variant="danger" onClick={() => handleDelete(employees._id)}>Delete</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default EmployeeCard;
