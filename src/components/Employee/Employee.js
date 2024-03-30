// import React, { useEffect, useState } from 'react';
// import Form from 'react-bootstrap/Form';
// import { Button } from 'react-bootstrap';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Nave from '../Nav';

// const EmployeeForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     age: '',
//     email: '',
//     image: null,
//     report:'',
//     department: '', // No need to fetch department initially
//     description: ''
//   });

//   const [departments, setDepartments] = useState([]);
//   const [departmentsHead, setDepartmentsHead] = useState([]);

//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   axios.get('http://localhost:4001/deptName')
//   //     .then((res) => {
//   //       setDepartments(res.data);
//   //     })
//   //     .catch((err) => console.log(err));
//   // }, []);

//   // useEffect(() => {
//   //   axios.get('http://localhost:4001/deptHeadName')
//   //     .then((res) => {
//   //       setDepartmentsHead(res.data);
//   //     })
//   //     .catch((err) => console.log(err));
//   // }, []);


//   useEffect(() => {
//     axios.get('http://localhost:4001/deptName')
//       .then((res) => {
//         setDepartments(res.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   useEffect(() => {
//     axios.get('http://localhost:4001/deptHeadName')
//       .then((res) => {
//         setDepartmentsHead(res.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);



//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({ ...formData, [name]: files ? files[0] : value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append('name', formData.name);
//       formDataToSend.append('age', formData.age);
//       formDataToSend.append('image', formData.image);
//       formDataToSend.append('email', formData.email);
//       formDataToSend.append('department', formData.department);
//       formDataToSend.append('report', formData.report);
//       formDataToSend.append('description', formData.description);

//       await axios.post('http://localhost:4001/employee', formDataToSend);
//       console.log('employee added successfully');
//       alert('employee added successfully');
//       navigate('/ecards');
//     } catch (error) {
//       console.error('Error adding employee: ', error);
//       alert('Error adding employee: ', error.message);
//     }
//   };

//   return (
//     <>
//       <Nave />
      
//       <div className='E-form'>
//       <h3 style={{ textAlign: 'center',color:'black' }}>Employee Form</h3>
      
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="name">
            
//             <Form.Control
//               type="text"
//               name="name"
//               placeholder='Enter Emoployee name'
//               value={formData.name}
//               onChange={handleChange}
//             />
//           </Form.Group> <br></br>
//           <Form.Group controlId="age">
            
//             <Form.Control
//               type="number"
//               name="age"
//               placeholder='Age'
//               value={formData.age}
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <br></br>
//           <Form.Group controlId="email">
          
//             <Form.Control
//               type="text"
//               name="email"
//               placeholder='Employee Number'
//               value={formData.email}
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <br></br>
//           <Form.Group controlId="image">
         
//             <Form.Control
//               type="file"
//               name="image"
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <br></br>
//           <Form.Group controlId="department">
            
//             <Form.Control
//               as="select"
//               name="department"
//               value={formData.department}
//               onChange={handleChange}
//             >
//               <option value="">Select Department</option>
//               {departments.map((dept) => (
//                 <option key={dept._id} value={dept.department}>
//                   {dept.department}
//                 </option>
//               ))}
//             </Form.Control>
//           </Form.Group>
//           <br></br>
//           <Form.Group controlId="department">
            
//             <Form.Control
//               as="select"
//               name="departmentheadd"
//               value={formData.report}
//               onChange={handleChange}
//             >
//               <option value="">Select Department Head</option>
//               {departments.map((rep) => (
//                 <option key={rep._id} value={rep.report}>
//                   {rep.report}
//                 </option>
//               ))}
//             </Form.Control>
//           </Form.Group>
//          <br></br>
//           <Form.Group controlId="description">
          
//             <Form.Control
//               as="textarea"
//               name="description"
//               rows={3}
//               value={formData.description}
//               onChange={handleChange}
//               placeholder='Description'
//             />
//           </Form.Group>
//           <br></br>
//           <Button type="submit">Submit</Button>
//         </Form>
//       </div>
//     </>
//   );
// };

// export default EmployeeForm;
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Nave from '../Nav';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    image: null,
    department: '', // No need to fetch department initially
    report: '', // Corrected from 'report' to 'departmentHead'
    description: ''
  });

  const [departments, setDepartments] = useState([]);
  const [departmentsHead, setDepartmentsHead] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4001/deptName')
      .then((res) => {
        setDepartments(res.data);
      })
      .catch((err) => console.log(err));
      
    axios.get('http://localhost:4001/deptHeadName')
      .then((res) => {
        setDepartmentsHead(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.age || !formData.email || !formData.department || !formData.report || !formData.description) {
      alert("Please fill in all fields");
      return; // Exit early if any field is empty
    }
    
    try {
     
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('age', formData.age);
      formDataToSend.append('image', formData.image);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('department', formData.department);
      formDataToSend.append('report', formData.report);
      formDataToSend.append('description', formData.description);

      await axios.post('http://localhost:4001/employee', formDataToSend);
      console.log('Employee added successfully');
      alert('Employee added successfully');
      navigate('/ecards');
    } catch (error) {
      console.error('Error adding employee: ', error);
      alert('Error adding employee: ', error.message);
    }
  };

  return (
    <>
      <Nave />
      
      <div className='E-form'>
        <h3 style={{ textAlign: 'center', color: 'black' }}>Employee Form</h3>
      
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter Employee name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <br></br>
          <Form.Group controlId="age">
            <Form.Control
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
            />
          </Form.Group>
          <br></br>
          <Form.Group controlId="email">
            <Form.Control
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <br></br>
          <Form.Group controlId="image">
            <Form.Control
              type="file"
              name="image"
              onChange={handleChange}
            />
          </Form.Group>
          <br></br>
          <Form.Group controlId="department">
            <Form.Control
              as="select"
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
          </Form.Group>
          <br></br>
          <Form.Group controlId="report">
            <Form.Control
              as="select"
              name="report" // Corrected from 'report' to 'departmentHead'
              value={formData.report}
              onChange={handleChange}
            >
              <option value="">Select Department Head</option>
              {departmentsHead.map((head) => (
                <option key={head._id} value={head.name}>
                  {head.name}
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
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
            />
          </Form.Group>
          <br></br>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
};

export default EmployeeForm;



