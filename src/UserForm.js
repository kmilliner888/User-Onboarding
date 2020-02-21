import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';

const UserForm = ()=> {
    return (
        <div className="user-form">
            <Form>
                <label>
                    Name
                    <Field type="text" name="name" placehold="name" />
                </label>
                <label>
                    Email
                    <Field type="email" name="email" placeholder="email" />
                </label>
                <label>
                    Password
                    <Field type="password" name="password" placeholder="password" />
                </label>
                <label>
                    Terms of Service
                    <Field type="checkbox" name="terms" />
                </label>
                <button>Submit</button>
            </Form>
        </div>
    )
}

export default UserForm;