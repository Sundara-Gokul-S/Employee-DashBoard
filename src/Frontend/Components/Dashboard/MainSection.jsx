import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Card from './Card';
import AttendanceList from './AttendanceList';

import profileP from 'C:/EMP/emp/src/Frontend/Assests/profile-icon.jpg';
import profile1 from 'C:/EMP/emp/src/Frontend/Assests/123.jpg';
import profile2 from 'C:/EMP/emp/src/Frontend/Assests/GT1.jpg';

const MainSection = () => {
  const navigate = useNavigate();

  const handleCrudButtonClick = () => {
    navigate('/employee/list');
  };

  return (
    <section className="main" id='admin'>
      <div className="main-top">
        <ul className="top-nav">
          <li><h1>Attendance</h1></li>
          <li><button onClick={handleCrudButtonClick}>crud</button></li>
          <li className="logout-link">
            <NavLink to="/" className="logout-navlink">
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="users">
        <Card imgSrc={profile1} name="Prasanna " role="Frontend" month="85%" year="87%" />
        <Card imgSrc={profile2} name="Sundara Gokul" role="Frontend" month="82%" year="85%" />
        <Card imgSrc={profileP} name="Ajay" role="Backend" month="94%" year="92%" />
        <Card imgSrc={profileP} name="Barath" role="Backend" month="85%" year="82%" />
      </div>
      <AttendanceList />
    </section>
  );
};

export default MainSection;
