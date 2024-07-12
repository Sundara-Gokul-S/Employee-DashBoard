import React from 'react';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import './App.css';
import LoginSignup from './Frontend/Components/LoginSignup/LoginSignup';
import './Frontend/styles/stylee.css';

import MainSection from './Frontend/Components/Dashboard/MainSection';
import Register from 'C:/EMP/emp/src/Frontend/Components/LoginSignup/Register.jsx'

//CRUD operation

import EmpCreate from './Frontend/CRUD/EmpCreate';
import EmpEdit from './Frontend/CRUD/EmpEdit';
import EmpDetail from './Frontend/CRUD/EmpDetail';
import EmpListing from './Frontend/CRUD/EmpListing';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    
      <div className="App">
        <Routes>
          <Route path='/' element={<LoginSignup/>}/>
          <Route path='/register'element={<Register/>}/>
   
          <Route path="/main" element={<MainSection />} />

          <Route path="/employee/list" element={<EmpListing />} />
        <Route path="/employee/create" element={<EmpCreate />} />
        <Route path="/employee/edit/:empid" element={<EmpEdit />} />
        <Route path="/employee/detail/:empid" element={<EmpDetail />} />
        
        </Routes>
      </div>
    
  );
}

export default App;
