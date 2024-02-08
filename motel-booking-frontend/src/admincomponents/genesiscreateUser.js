import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../compnents/authContext'; // Import your AuthContext

function CreateRoleForm() {
  const [roleName, setRoleName] = useState('');
  const [permissions, setPermissions] = useState('');
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext); // Assuming your AuthContext provides the token
  console.log(token);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const roleData = {
      name: roleName,
      permissions: permissions.split(',').map(permission => permission.trim()), // Assuming permissions are entered as comma-separated values
    };

    try {
      await axios.post('http://localhost:3001/admin/roles', roleData, {
        headers: {
          Authorization: `Bearer ${token}`, // Use the token for authorization
        },
      });
      alert('Role created successfully');
      // Reset form or handle success
      setRoleName('');
      setPermissions('');
    } catch (err) {
      setError(err.response?.data?.error || 'Error creating role');
    }
  };

  return (
    <div>
      <h2>Create New Role</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="roleName">Role Name:</label>
          <input
            type="text"
            id="roleName"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="permissions">Permissions (comma-separated):</label>
          <input
            type="text"
            id="permissions"
            value={permissions}
            onChange={(e) => setPermissions(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Create Role</button>
      </form>
    </div>
  );
}

export default CreateRoleForm;
