import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';

const UserForm = ({touched, errors, status})=> {
    const [user, setUser] = useState([]);

    useEffect(() => {
        status && setUser(user =>[...user, status])
    }, [status]);


    return (
        <div className="user-form">
            <Form>
                <label>
                    Name
                    <Field type="text" name="name" placehold="name" />
                    {touched.name && errors.name && (
                        <p className="errors">{errors.name}</p>
                    )}
                </label>
                <label>
                    Email
                    <Field type="email" name="email" placeholder="email" />
                    {touched.email && errors.email && (
                        <p className="errors">{errors.email}</p>
                    )}
                </label>
                <label>
                    Password
                    <Field type="password" name="password" placeholder="password" />
                    {touched.password && errors.password && (
                        <p className="errors">{errors.password}</p>
                    )}
                </label>
                <label>
                    Terms of Service
                    <Field type="checkbox" name="terms" />
                </label>
                <label>
                    Role:
                    <Field component="select" name="role">
                        <option>Choose Your Role:</option>
                        <option>Frontend Developer</option>
                        <option>Backend Developer</option>
                        <option>Fullstack Developer</option>
                        <option>UI/UX Designer</option>
                    </Field>
                </label>

                <button type="submit">Submit</button>
            </Form>
            {user.map(user => (
                <ul key= {user.id}>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Password: {user.password}</li>
                    <li>Terms of Service: {`${user.terms}`} </li>
                </ul>
            ))}
        </div>
    )
}

export default withFormik({
    mapPropsToValues: props => ({
        name: props.name || "",
        email: props.email || "",
        password: props.password || "",
        terms: props.terms || false
    }),
    validationSchema: yup.object().shape({
        name: yup
            .string()
            .required("Name is required"),
        email: yup
            .string()
            .required("Email is required"),
        password: yup
            .string()
            .required("Password is required")
    }),
    handleSubmit: (values, {resetForm, setStatus}) => {
        axios
            .post("https://reqres.in/api/users", values)
            .then(response => {
                console.log('this is the response', response);
                setStatus(response.data);
                resetForm();
            })
            .catch(err => console.log(err.response));
    }
}) (UserForm);