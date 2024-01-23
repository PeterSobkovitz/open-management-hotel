import React,{useState,useRef,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
function LoginModal({ isOpen, onClose }) {
    const modalRef = useRef();
    const Navigate=useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onSubmit = async(data)=>{
      try{
          console.log("resp");
          const response=await axios.post("http://localhost:3001/login",data)
          onClose();
          navigate('/');
      }
      catch(e){
          console.log(e);
      }
    }

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          onClose();


        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [onClose]);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div ref={modalRef}>

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Sign In</h2>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-200">
            {/* Close icon */}
          </button>
        </div>
        <form>
          <input type="email" placeholder="Email" className="w-full p-2 mb-4 border border-gray-300 rounded"/>
          <input type="password" placeholder="Password" className="w-full p-2 mb-4 border border-gray-300 rounded"/>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Sign In</button>
        </form>
      </div>
      </div>
    </div>
  );
}

export default LoginModal;