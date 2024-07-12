import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'C:/EMP/emp/src/Frontend/styles/LoginSignup.css';

export default function Login() {
    const loginValidationSchema = yup.object({
        name: yup.string().required('Name is required'),
        email: yup.string().email('Invalid email address').required('Email is required'),
        password: yup.string().required('Password is required').min(8, 'Password should be of minimum 8 characters length'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: loginValidationSchema,

        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://localhost:5000/admin/register-admin', values);
                console.log('Registration successful:', response.data);
                toast.success('Registration successful!');
            } catch (error) {
                console.error('There was an error registering the admin:', error);
                toast.error('There was an error registering the admin.');
            }
        },
    });

    return (
        <div className='add-form'>
            <ToastContainer />
            <h1>Register</h1>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    id='name'
                    label='Name'
                    variant='outlined'
                    placeholder='Name'
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    name='name'
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name ? formik.errors.name : null}
                />
                <TextField
                    id='email'
                    label='Email'
                    variant='outlined'
                    placeholder='Email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    name='email'
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email ? formik.errors.email : null}
                />
                <TextField
                    id='password'
                    label='Password'
                    variant='outlined'
                    placeholder='Password'
                    type='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    name='password'
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password ? formik.errors.password : null}
                />
                <Button variant='contained' type='submit'>
                    Submit
                </Button>
            </form>
            <h4>
                Already have an account? Click here
                <Link to={'/'}> Login</Link>
            </h4>
        </div>
    );
}
