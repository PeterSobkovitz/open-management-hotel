// In src/components/AuthForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';


const AuthForm = ({ register }) => {
    console.log("AUTHORIZATION")
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        // Add other fields if necessary for registration
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const endpoint = register ? '/register' : '/login';
        try {
            const response = await axios.post(`http://localhost:3001/${endpoint}`, formData);
            // Handle response (e.g., store token, redirect user)
        } catch (error) {
            // Handle error (e.g., show error message)
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
            </Form.Group>
            {/* Additional fields for registration */}
            
            <Button variant="primary" type="submit">
                {register ? 'Register' : 'Login'}
            </Button>
        </Form>
    );
};

export default AuthForm;
