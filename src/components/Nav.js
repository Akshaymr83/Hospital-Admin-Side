import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'; 
import Sidebar from './Sidebar/Sidebar';
import "./nav.css"
import { Link } from 'react-router-dom';


import PlusLogo from '../components/Img/E_CARE2.png';

function Nave() {
  let user = JSON.parse(localStorage.getItem('user-info'));

  console.warn(user)


 

  return (
    <div >    
      <Navbar id='navbar' data-bs-theme="dark" className="fixed-top">
        <Sidebar />
        <Container>
          <Navbar.Brand href="#home" className="ecare-logo">
            <img src={PlusLogo} alt="Plus Logo" style={{height:'3rem', paddingRight: '10px',mixBlendMode:'screen',overflow:'hidden'}} />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Link to ={'/home'} className="link-no-underline"><Nav.Link href="#home" >Home</Nav.Link></Link>
            <Link to ={'/ecards'} className="link-no-underline"><Nav.Link href="#home" >Employee</Nav.Link></Link>
            <Link to ={'/dcards'} className="link-no-underline"><Nav.Link href="#home" >Department</Nav.Link></Link>
            <Link to ={'/DHcards'} className="link-no-underline"><Nav.Link href="#home" >DepartmentHead</Nav.Link></Link>
           <NavDropdown title={user && user.name}>
            <NavDropdown.Item>logout</NavDropdown.Item>
           </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Nave;
