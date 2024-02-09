import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoleEditor from './modifyrole';

function ListRole({ userId }) {
  const [roles, setRoles] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState('');
  
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:3001/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRoles(response.data); // Assuming the API returns an array of role objects
      } catch (error) {
        console.error('Failed to fetch roles', error);
      }
    };

    fetchRoles();
  }, [token]);

  const handleRoleSelection = (e) => {
    setSelectedRoleId(e.target.value);
  };

  // Log the selectedRoleId when it changes
  useEffect(() => {
    if (selectedRoleId) {
      console.log(selectedRoleId);
      // Any additional logic that needs to run when selectedRoleId changes
    }
  }, [selectedRoleId]);

  return (
    <div>
      <h2>Select a Role to Modify</h2>
      <select onChange={handleRoleSelection} value={selectedRoleId}>
        <option value="">Select a Role</option>
        {roles.map((role) => (
          <option key={role._id} value={role._id}>{role.name}</option>
        ))}
      </select>
      {selectedRoleId && <RoleEditor userId={selectedRoleId} />}
    </div>
  );
}

export default ListRole;
