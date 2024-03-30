import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Nave from "../Nav";
import "./login.css";
import png2 from '../Img/png2.svg'

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState(""); // Add userName state

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return; // Exit early if any field is empty
    }
    axios
    .post("http://localhost:4001/signup", { name, email, password })
    .then((res) => {
      // Extract the user's name from the response
      const userName = res.data.name; // Use res.data.name to extract the user's name
      // Pass the userName to the Nave component
      setUserName(userName);
      navigate("/login");
      alert("User created");
    })
    .catch((err) => {
      console.log(err);
    });
  
  };

  return (
    <>
    
      <div className="signupcontainer d-flex justify-content-center align-items-center flex-wrap">
        
        <div className="content-wrapper" id="signupcontent-wrapper" >
        <div >
          <img  className="png2" src={png2}></img>
        </div>
         

         <div className="signupcontainer2">
          <form onSubmit={handleSubmit} style={{width:'400px'}}>
          <h3 className="text-center">Register</h3>
          <br></br>
            <div className="form-group">
              <input
                type="text"
                autoComplete="off"
                name="name"
                placeholder="Enter Your name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <br></br>
            <div className="form-group">
              <input
                type="email"
                autoComplete="off"
                name="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <br></br>
            <div className="form-group">
              <input
                type="password"
                autoComplete="off"
                name="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <br></br>
            <div className="text-center">
              <button id="loginbutton" type="submit">
                Register
              </button>
            </div>
          </form>
          <p style={{textAlign:'center'}}> 
            <b>Already have an account?</b>
          </p>
          <Link
            to="/login"
            style={{ color: "blue", textAlign: "center", textDecoration: "none" }}
          >
            <p>Login</p>
          </Link>
          </div>
         
        </div>
      
      </div>
    </>
  );
};

export default Signup;
