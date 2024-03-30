import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Nave from '../Nav';
import "./department.css"
import Form from 'react-bootstrap/Form';

const DepartmentForm = () => {
  const [formData, setFormData] = useState({
    department: '',
    year: '',
    image: null,
    description: ''
  });
const navigate=useNavigate();
  const handleChange = (e) => {
    
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const [departments, setDepartments] = useState([]);



 
  useEffect(() => {
    axios.get('http://localhost:4001/deptName')
      .then((res) => {
        setDepartments(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.department || !formData.year || !formData.image || !formData.description) {
      alert("Please fill in all fields");
      return; // Exit early if any field is empty
    }
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('department', formData.department);
      formDataToSend.append('year', formData.year);
      formDataToSend.append('image', formData.image);
      formDataToSend.append('description', formData.description);

      await axios.post('http://localhost:4001/departments', formDataToSend);
      console.log('Department added successfully');
      alert('Department added successfully');
      navigate('/dcards')
      
      // You can redirect or perform any other action upon successful form submission
    } catch (error) {
      console.error('Error adding department: ', error);
      alert('Error adding department: ', error.message);
    }
  };



  return (
    <div className='form-bg'>
       
      <Nave/>
  
    
    <div className='form'>
    <h3 style={{ textAlign: 'center',color:'black' }}>Department Form</h3>
    <form onSubmit={handleSubmit}>
     
    {/* <Form.Group controlId="department">
            <Form.Label>Department</Form.Label>
            <Form.Control
              as="select"
              className='department'
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept.department}>
                  {dept.department}
                </option>
              ))}
            </Form.Control>
          </Form.Group> */}
          <input className="department" type="text" name="department" placeholder="Add Department" value={formData.department} onChange={handleChange} />
      <input className="year" type="number" name="year" placeholder="Year" value={formData.year} onChange={handleChange} />
      <input className="image" type="file" name="image" onChange={handleChange} />
      <input  className="description"type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} /> <br></br>
      
      <button  className="submit"type="submit">Submit</button>
    </form>
    </div>
    </div>
   
  );
};

export default DepartmentForm;
