
import React from 'react';
import Nave from './Nav';
import './home.css'



function Home() {
  return (
   
    <>
    
    <Nave/>

    <div className='cards'>

    <div class="card">
  <div class="img">
    <div class="save">
   
    </div>
  </div>

  <div class="text">
    <p class="h3"> Employees</p>
    <p class="p"> 6 Video - 40 min </p>

    <div class="icon-box">
  
    <a><p class="span">Employee
    </p></a></div>
  </div>
</div>

<div class="card">
  <div class="img">
    <div class="save">
   
    </div>
  </div>

  <div class="text">
    <p class="h3"> Department </p>
    <p class="p"> 6 Video - 40 min </p>

    <div class="icon-box">
    <a><p class="span">Department 
    </p></a>
  
     </div>
  </div>
</div>


<div class="card">
  <div class="img">
    <div class="save">
   
    </div>
  </div>

  <div class="text">
    <p class="h3"> Department Head </p>
    <p class="p"> 6 Video - 40 min </p>

    <div class="icon-box">
  
    <a><p class="span">Department head
    </p></a> </div>
  </div>
</div>
    </div>


    
    </>
  )
}

export default Home