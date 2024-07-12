import React from 'react';

const Card = ({ imgSrc, name, role, month, year }) => (
  <div className="card">
    <img src={imgSrc} alt={`${name}'s profile`} />
    <h2>{name}</h2>
    <p>{role}</p>
    <p>Monthly Attendance: {month}</p>
    <p>Yearly Attendance: {year}</p>
  </div>
);

export default Card;
