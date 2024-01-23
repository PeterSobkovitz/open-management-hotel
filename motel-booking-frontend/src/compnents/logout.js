import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();
  const token=localStorage.getItem('token');
  const handleLogout = async () => {
    try {
      // If your server requires a request to logout, uncomment the next line
      await axios.post("http://localhost:3001/logout",{},{
        headers:{
            'Authorization':`Bearer ${token}`
        }
      });
      localStorage.removeItem('token');
      
      navigate('/');
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default Logout;