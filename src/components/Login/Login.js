import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";
import Nave from "../Nav";
import png3 from '../Img/png3.svg'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState(""); // Add userName state

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields");
      return; // Exit early if any field is empty
    }
    axios
    .post("http://localhost:4001/login", { email, password })
    .then((res) => {
      if (res.data.Status === "Success") {
        // Set the user's name if available
        setUserName(res.data.name); // Use res.data.name instead of res.data.userName
        if (res.data.role === "admin") {
          navigate("/home");
        } else {
          navigate("/website");
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
  
  };

  return (
    <>
     
      <div id="containerlogin" className="container-fluid d-flex justify-content-center align-items-center">
        <div className="content-wrapper" style={{display:'flex',flexDirection:'row'}}>
       
          <div>
          <form className="loginform" onSubmit={handleSubmit}>
          <h3 className="text-center">LOGIN</h3>
          <br></br>
            <input type="email" placeholder="enter your email" autoComplete="off" name="email" onChange={(e) => setEmail(e.target.value)} />
            <br></br>
            <br></br>
            <input placeholder="enter your password" type="password" autoComplete="off" name="password" onChange={(e) => setPassword(e.target.value)} />
            <br></br>
            <br></br>
            <button id="loginbutton" type="submit">Login</button>
          </form>
          </div>
          <div>
            <img style={{height:'200px',width:'200px'}} src={png3}></img>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
