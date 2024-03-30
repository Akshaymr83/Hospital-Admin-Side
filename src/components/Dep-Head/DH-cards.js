import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Nave from '../Nav'; 
import "./DHemployee.css";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'; // Fixed import statement

function DH_cards() {
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4001/getDepHead')
    .then((res) => {
      console.log("data received", res.data);
      setEmployee(res.data.employee);
    })
    .catch((err) => {
      console.log('error fetching data', err);
    });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:4001/deleteDepHead/${id}`)
    .then((res) => {
      console.log("deleted");
      setEmployee(employee.filter(employees => employees._id !== id)); 
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <>
      <Nave/>
      <br></br>
      <h4><b>DEPARTMENT HEADS</b></h4>
      <div className='e-background grid'>
        {Array.isArray(employee) && employee.map((employees, index) => (
          <Card className='ecard' key={index}>
            <Card.Img className='Img'
              variant="top"
              src={`http://localhost:4001/${employees.image}`}
              alt={`Department ${employees.name}`}
            />
            <Card.Body>
              <Card.Text><p><b>Name:</b>{employees.name}</p></Card.Text>
              <Card.Text><p><b>Employee Number:</b>{employees.email}</p></Card.Text>
              <Card.Text><p><b>Age:</b>{employees.age}</p></Card.Text>
              <Link to={`/DEPARTMENT/${employees.department}`} style={{color:'#3ba9a9'}}>
              <p className="card-title m-2">Department: {employees.department}</p>
              </Link>
              <Card.Text><p><b>Description:</b>{employees.description}</p></Card.Text>
              <Link to={`/updateDepHead/${employees._id}`}><Button variant="primary">Update</Button></Link>
              <Button variant="danger" onClick={() => handleDelete(employees._id)}>Delete</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
}

export default DH_cards;
