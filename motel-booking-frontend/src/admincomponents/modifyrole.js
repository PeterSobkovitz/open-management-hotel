import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../compnents/authContext';

function RoleEditor({ roleId }) {
    const [newRoles, setNewRoles] = useState([]); // Assuming multiple roles can be set
    const { token } = useContext(AuthContext);
  
    const handleRolesChange = (e) => {
      setNewRoles(e.target.value.split(',').map(role => role.trim())); // Convert comma-separated roles to an array
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.patch(`http://localhost:3001/admin/users/${userId}/roles`, 
          { roles: newRoles }, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert('Roles updated successfully.');
      } catch (error) {
        alert('Failed to update roles.');
        console.error(error);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <h3>Edit Roles</h3>
        <label htmlFor="newRoles">Enter new roles (comma-separated):</label>
        <input
          type="text"
          id="newRoles"
          value={newRoles.join(', ')}
          onChange={handleRolesChange}
        />
        <button type="submit">Update Roles</button>
      </form>
    );
  }
  export default RoleEditor;