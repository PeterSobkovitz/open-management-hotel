import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../compnents/authContext'; 

function ListRole({ userId }) {
  const [roles, setRoles] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState('');
  
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        // Fetch roles from your API
        const response = await axios.get('http://localhost:3001/admin/roles', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRoles(response.data);
      } catch (error) {
        console.error('Failed to fetch roles', error);
      }
    };

    fetchRoles();
  }, [token]); // Fetch roles when the component mounts or token changes

  const handleRoleSelection = (e) => {
    setSelectedRoleId(e.target.value);
  };

  return (
    <div>
      <h2>Select a Role to Modify</h2>
      <select onChange={handleRoleSelection} value={selectedRoleId}>
        <option value="">Select a Role</option>
        {roles.map((role) => (
          <option key={role._id} value={role._id}>{role.name}</option>
        ))}
      </select>
      {selectedRoleId && <RoleEditor roleId={selectedRoleId} />}
    </div>
  );
}
export default ListRole;
