import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from 'C:/EMP/emp/src/Frontend/styles/AttendanceList.css'; // Import the CSS module

const AttendanceList = () => {
  const [empdata, setEmpData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/employees").then((res) => {
      return res.json();
    }).then((resp) => {
      setEmpData(resp);
    }).catch((err) => {
      console.log(err.message);
    });
  }, []);

  const viewProfile = (id) => {
    navigate(`/employee/detail/${id}`);
  }

  return (
    <section className="attendance">
      <div className="attendance-list">
        <h1>Attendance List</h1>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>View Profile</th>
            </tr>
          </thead>
          <tbody>
            {empdata.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.department}</td>
                <td>
                <button id={`button-${item.id}`} onClick={() => viewProfile(item.id)} className={styles.viewButton}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AttendanceList;
