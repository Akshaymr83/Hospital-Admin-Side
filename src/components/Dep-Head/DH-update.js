// import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Nave from '../Nav';
import { useEffect, useState } from 'react';

const DH_Update= () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [department, setDepartment] = useState('');
  const [description, setDescription] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:4001/getUserDepHead/${id}`)
      .then((res) => {
        const employeeData = res.data;
        setName(employeeData.name);
        setAge(employeeData.age);
        setEmail(employeeData.email);
        setImage(employeeData.image);
        setDepartment(employeeData.department);
        setDescription(employeeData.description);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.email || !formData.image || !formData.department || !formData.description) {
      alert("Please fill in all fields");
      return; // Exit early if any field is empty
    }
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('age', age);
    formData.append('email', email);
    formData.append('image', image);
    formData.append('department', department);
    formData.append('description', description);
      
    axios.put(`http://localhost:4001/updateDepHead/${id}`, formData)
      .then((res) => {
        console.log(res.data);
        alert("Success");
        navigate("/DHcards");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Update image state with the selected file
  };

  useEffect(() => {
    axios.get('http://localhost:4001/deptName')
      .then((res) => {
        setDepartments(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Nave />
      
      <div className='E-form'>
      <h3 style={{ textAlign: 'center',color:'black' }}>Department Head Form</h3>
        <Form onSubmit={handleEdit}>
          <Form.Group controlId="name">
            
            <Form.Control
              type="text"
              name="name"
              placeholder='Name'
              value={name}
              onChange={(e)=> setName(e.target.value)}
            />
          </Form.Group>
          <br></br>
          <Form.Group controlId="age">
           
            <Form.Control
              type="number"
              placeholder='Age'
              name="age"
              value={age}
              onChange={(e)=> setAge(e.target.value)}
            />
          </Form.Group>
          <br></br>
          <Form.Group controlId="email">
     
            <Form.Control
              type="text"
              name="email"
              value={email}
              placeholder='Employee Number'
              onChange={(e)=> setEmail(e.target.value)}
            />
          </Form.Group>
          <br></br>
          <Form.Group controlId="image">
            
            <Form.Control
              type="file"
              name="image"
              onChange={handleImageChange}
            />
          </Form.Group>
          <br></br>
          <Form.Group controlId="department">
           
            <Form.Control
              as="select"
              name="department"
              placeholder='Select Department'
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept.department}>
                  {dept.department}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <br></br>
          <Form.Group controlId="description">
         
            <Form.Control
              as="textarea"
              name="description"
              rows={3}
              placeholder='description'
              value={description}
              onChange={(e)=> setDescription(e.target.value)}
            />
          </Form.Group>
          <br></br>
          <Button type="submit">Edit</Button>
        </Form>
      </div>
    </>
  );
};

export default DH_Update;
