import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../compnents/authContext'; // Assuming you have an authentication context

function AdminRegisterUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    roles: [], // This will store selected role IDs
  });
  const [availableRoles, setAvailableRoles] = useState([]); // To store fetched roles
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext); // Use the admin's token for authorization

  useEffect(() => {
    // Function to fetch roles
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:3001/admin/roles', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        setAvailableRoles(response.data); // Assuming response.data is an array of role objects
      } catch (err) {
        setError('Failed to fetch roles.');
        console.error(err);
      }
    };

    fetchRoles();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRoleChange = (e) => {
    // Convert selected options to an array of values (role IDs)
    const selectedRoles = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prevData => ({
      ...prevData,
      roles: selectedRoles,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/register-admin', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      alert('Staff user created successfully');
      // Reset form or handle further logic here
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create staff user.');
    }
  };

  return (
    <div>
      <h2>Register New Staff User</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
      <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <label>
          Roles:
          <select multiple onChange={handleRoleChange} value={formData.roles}>
            {availableRoles.map(role => (
              <option key={role._id} value={role._id}>{role.name}</option>
            ))}
          </select>
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default AdminRegisterUser;
