import Employee from "./components/Employee/Employee";
import EmployeeCard from "./components/Employee/E-cards";

import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import E_Update from "./components/Employee/E-update";
import Departments from "./components/Departments/Departments";
import Dcards from "./components/Departments/D-cards";
import D_update from "./components/Departments/D-update";
import Frontpage from "./components/Frontpage.js/Frontpage";
import DH_head from "./components/Dep-Head/DH-head";
import DH_Update from "./components/Dep-Head/DH-update";
import DH_cards from "./components/Dep-Head/DH-cards";
import Website from "./components/Website/Website";
import Login from "./components/Login/Login";
import Signup from "./components/Login/SignUp";
import Doctors from "./components/Doctors/Doctors";
import DEPARTMENT from "./components/Doctors/DEPARTMENT";



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path='/' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/home' element={<Frontpage/>} />
          <Route path='/employee' element={<Employee/>} />
          <Route path='/ecards' element={<EmployeeCard/>} />
          <Route path='/updateEmployee/:id' element={<E_Update/>} />
          <Route path='/departmentpost' element={<Departments/>}/>
          <Route path="/dcards" element={<Dcards/>}/>
          <Route path='/updateDepartment/:id' element={<D_update/>}/>
          <Route path='/DepHead' element={<DH_head/>} />
          <Route path='/DHcards' element={<DH_cards/>} />
          <Route path='/updateDepHead/:id' element={<DH_Update/>} />
          <Route path="/website" element={<Website/>}/>
          <Route path="/doctors/:id" element={<Doctors/>} />
          <Route path="/DEPARTMENT/:id" element={<DEPARTMENT/>} />
          
  
        </Routes>
        </Router>

    </div>
  );
}

export default App;
