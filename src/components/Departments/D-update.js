import React, { useState, useEffect } from 'react';
import Nave from '../Nav';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "./department.css"

function D_update() {
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [image, setImage] = useState(null); // Use null instead of empty string for file
  const [description, setDescription] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4001/getUserDepartment/${id}`)
      .then((res) => {
        const departmentData = res.data; // Assuming the response contains the department data
        setDepartment(departmentData.department);
        setYear(departmentData.year);
        setImage(departmentData.image); // Assuming image is a URL or a base64 string
        setDescription(departmentData.description);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleEdit = (e) => {
    e.preventDefault();
    if (!formData.department || !formData.year || !formData.image || !formData.description) {
      alert("Please fill in all fields");
      return; // Exit early if any field is empty
    }
    const formData = new FormData(); // Create a FormData object to handle file uploads
    formData.append('department', department);
    formData.append('year', year);
    formData.append('image', image); // Append the file object
    formData.append('description', description);

    axios.put(`http://localhost:4001/updateDepartment/${id}`, formData)
      .then((res) => {
        console.log(res.data);
        alert("Success");
        navigate("/dcards");
      })
      .catch((err) => {
        console.error("Error editing department:", err);
      });
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Update image state with the selected file
  }

  return (
    <div className='form-bg'>
      <Nave />
      <div className='form'>
        <h3 style={{ textAlign: 'center', color: 'black' }}>Department Form</h3>
        <form onSubmit={handleEdit}>
          <input className="department" type="text" name="department" placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} />
          <input className="year" type="number" name="year" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} />
          <input className="image" type="file" name="image" onChange={handleImageChange} />
          <input className="description" type="text" name="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <button className="submit" type="submit">Edit</button>
        </form>
      </div>
    </div>




  );
}

export default D_update;
