import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'C:/EMP/emp/src/Frontend/styles/LoginSignup.css';

export default function Login() {
    const navigate = useNavigate();

    const loginValidationSchema = yup.object({
        email: yup.string().required('Email is required').email('Invalid email address'),
        password: yup.string().required('Password is required').min(8, 'Password should be of minimum 8 characters length'),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginValidationSchema,

        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://localhost:5000/admin/login-admin', values);
                console.log('Login successful:', response.data);
                toast.success('Welcome !');
                navigate('/main');
            } catch (error) {
                console.error('There was an error logging in the admin:', error);
                toast.error('Check email or password.');
            }
        }
    });

    return (
        <div className='add-form'>
            <ToastContainer />
            <h1>Login</h1>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    placeholder='Email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    name="email"
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email ? formik.errors.email : null}
                />
                <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    placeholder='Password'
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    name='password'
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password ? formik.errors.password : null}
                />
                <Button variant="contained" type='submit'>Submit</Button>
            </form>
            <h4>
                Don't have an account? Click here
                <Link to={"/register"}> Register</Link>
            </h4>
        </div>
    );
}
