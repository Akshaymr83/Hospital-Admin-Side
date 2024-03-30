import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Nave from '../Nav';
import "./department.css"


function Dcards() {
  const [departments, setDepartments] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:4001/getdepartments")
      .then((res) => {
        console.log("Data received:", res.data);
        setDepartments(res.data.departments);
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
  }, []);
  const handleDelete = (id) => {
    axios.delete(`http://localhost:4001/deleteDepartment/${id}`)
      .then((res) => {
        console.log("Department deleted");
        // Update the state after deletion
        setDepartments(departments.filter(department => department._id !== id));
      })
      .catch((err) => {
        console.error("Error deleting department:", err);
        // Optionally, you can display an error message to the user
        // alert("Error deleting department. Please try again later.");
      });
  }
  


  return (
    <div>
      <Nave/>
      <div className='background grid'>
      {Array.isArray(departments) && departments.map((department, index) => (
        <Card className='dcard  text-center' key={index} >

          <Card.Img className='Img'
            variant="top"
            src={`http://localhost:4001/${department.image}`} // Assuming images are served from the root directory of the server
            alt={`Department ${department.department}`}
         
          />

          <Card.Body>
            <Card.Title><h3 style={{textAlign:'center'}}>{department.department}</h3></Card.Title>
            <Card.Text>{department.description}</Card.Text>
            <Card.Text><h5>Year Founded:{department.year}</h5></Card.Text>
            <Link to={`/updateDepartment/${department._id}`}><Button variant="primary">Update</Button></Link>
            <Button variant="danger" onClick={() => handleDelete(department._id)} >Delete</Button>
          </Card.Body>
        </Card>
      ))}
      </div>
    </div>
  );
}

export default Dcards;
