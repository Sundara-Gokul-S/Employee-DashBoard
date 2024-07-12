import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'C:/EMP/emp/src/Frontend/styles/EmpListing.css'; // Import the CSS file

const EmpListing = () => {
    const [empdata, empdatachange] = useState([]);
    const navigate = useNavigate();

    const LoadDetail = (id) => {
        navigate(`/employee/detail/${id}`);
    }

    const LoadEdit = (id) => {
        navigate(`/employee/edit/${id}`);
    }

    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch(`http://localhost:8000/employees/${id}`, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.');
                window.location.reload();
            }).catch((err) => {
                console.log(err.message);
            });
        }
    }

    useEffect(() => {
        fetch("http://localhost:8000/employees")
            .then((res) => res.json())
            .then((resp) => {
                empdatachange(resp);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-title">
                    <h2>Employee Listing</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="/employee/create" className="btn btn-success">Add New (+)</Link>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Department</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empdata.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.department}</td>
                                    <td>
                                        <button onClick={() => { LoadEdit(item.id) }} className="btn btn-edit">Edit</button>
                                        <button onClick={() => { Removefunction(item.id) }} className="btn btn-remove">Remove</button>
                                        <button onClick={() => { LoadDetail(item.id) }} className="btn btn-details">Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                   
                </div>
                <Link className="btn btn-danger" to="/main">Back</Link>
            </div>
            

        </div>
        
    );
}

export default EmpListing;
