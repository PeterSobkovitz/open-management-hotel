import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthForm from '../compnents/auth';
console.log("load");
import axios from 'axios';

// // Mock axios for handling HTTP requests
jest.mock('axios');
console.log("FFFFFF")
describe('AuthForm Component', () => {
    it('renders registration form when register prop is true', () => {
        const { getByLabelText, getByText } = render(<AuthForm register={true} />);
        expect(getByLabelText(/email/i)).toBeInTheDocument();
        expect(getByLabelText(/password/i)).toBeInTheDocument();
        // Check for additional registration fields if any
        expect(getByText(/register/i)).toBeInTheDocument();
    });

    // it('renders login form when register prop is false', () => {
    //     const { getByLabelText, getByText } = render(<AuthForm register={false} />);
    //     expect(getByLabelText(/email/i)).toBeInTheDocument();
    //     expect(getByLabelText(/password/i)).toBeInTheDocument();
    //     expect(getByText(/login/i)).toBeInTheDocument();
    // });

    // it('submits registration data correctly', async () => {
    //     const mockResponse = { /* Mock response data */ };
    //     axios.post.mockResolvedValueOnce({ data: mockResponse });

    //     const { getByLabelText, getByText } = render(<AuthForm register={true} />);
    //     fireEvent.change(getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    //     fireEvent.change(getByLabelText(/password/i), { target: { value: 'password123' } });
    //     // Fill in other fields for registration if needed

    //     fireEvent.click(getByText(/register/i));

    //     await waitFor(() => {
    //         expect(axios.post).toHaveBeenCalledWith('http://yourbackendendpoint.com/register', {
    //             email: 'test@example.com',
    //             password: 'password123',
    //             // Other data fields
    //         });
    //     });
    // });

    // it('submits login data correctly', async () => {
    //     const mockResponse = { /* Mock response data */ };
    //     axios.post.mockResolvedValueOnce({ data: mockResponse });

    //     const { getByLabelText, getByText } = render(<AuthForm register={false} />);
    //     fireEvent.change(getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    //     fireEvent.change(getByLabelText(/password/i), { target: { value: 'password123' } });

    //     fireEvent.click(getByText(/login/i));

    //     await waitFor(() => {
    //         expect(axios.post).toHaveBeenCalledWith('http://yourbackendendpoint.com/login', {
    //             email: 'test@example.com',
    //             password: 'password123'
    //         });
    //     });
    // });

    // Additional tests can include error handling, form validation, etc.
});
