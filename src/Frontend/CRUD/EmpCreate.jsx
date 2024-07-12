import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const EmpCreate = () => {
    const [id, idchange] = useState("");
    const [name, namechange] = useState("");
    const [email, emailchange] = useState("");
    const [phone, phonechange] = useState("");
    const [department, departmentchange] = useState("");
    const [active, activechange] = useState(true);
    const [validation, valchange] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();
        const empdata = { id, name, email, phone, department, active };

        // Check if ID or name already exists
        fetch("http://localhost:8000/employees")
            .then((res) => res.json())
            .then((data) => {
                const existingEmployee = data.find(emp => emp.id === id || emp.name.toLowerCase() === name.toLowerCase());
                if (existingEmployee) {
                    setError("Employee with this ID or name already exists.");
                } else {
                    fetch("http://localhost:8000/employees", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(empdata)
                    }).then((res) => {
                        alert('Saved successfully.');
                        navigate('/employee/list');
                    }).catch((err) => {
                        console.log(err.message);
                    });
                }
            }).catch((err) => {
                console.log(err.message);
            });
    };

    const generateId = (latestId) => {
        const newId = latestId + 1;
        return `EMP${newId.toString().padStart(2, '0')}`; // EMP01, EMP02, etc.
    };

    useEffect(() => {
        fetch("http://localhost:8000/employees")
            .then((res) => res.json())
            .then((data) => {
                const latestId = data.length > 0 ? data[data.length - 1].id.match(/\d+/)[0] : 0;
                const newId = generateId(parseInt(latestId));
                idchange(newId);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form onSubmit={handlesubmit}>
                        <div className="card" style={{ textAlign: "left" }}>
                            <div className="card-title">
                                <h2>Employee Create</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    {error && <div className="alert alert-danger">{error}</div>}
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>ID</label>
                                            <input value={id} className="form-control" readOnly />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input value={name} onChange={(e) => namechange(e.target.value)} className="form-control" required />
                                            {validation && name.length === 0 && <span className="text-danger">Enter the name</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input value={email} onChange={(e) => emailchange(e.target.value)} className="form-control" required />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input value={phone} onChange={(e) => phonechange(e.target.value)} className="form-control" required />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Department</label>
                                            <input value={department} onChange={(e) => departmentchange(e.target.value)} className="form-control" required />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-check">
                                            <input type="checkbox" className="form-check-input" checked={active} onChange={(e) => activechange(e.target.checked)} />
                                            <label className="form-check-label">Is Active</label>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 mt-3">
                                        <div className="form-group">
                                            <button className="btn btn-success" type="submit">Save</button>
                                            <Link to="/employee/list" className="btn btn-danger ml-2">Back</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EmpCreate;
