const axios = require('axios');
const bcrypt = require('bcrypt');

const Role=require("./role_model");
const mongoose=require("mongoose");
mongoose.connect('mongodb://localhost/27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
const createGenesisUser = async () => {
  const adminRole=await Role.findOne({name:'GenesisAdmin'});
  console.log(adminRole);
  const name = 'GenesisAdmin';
  const password = 'holera123'; // Use a strong, unique password.
  
  const email="jackson@admin.com";
 
  


  try {
    const response = await axios.post('http://localhost:3001/register-admin', {
      name:name,
      email:email,
      roles:[adminRole._id],
      
      password: password, // Depending on your endpoint, you might hash the password server-side
       // Specify roles as per your application's requirements
    });
    console.log('Genesis user created:', response.data);
  } catch (error) {
    console.error('Failed to create genesis user:', error.response.data);
  }
};

createGenesisUser();
// const ModifyRoles = async()=>{
    
//     const password = 'holera123'; // Use a strong, unique password.
  
//     const email="jackson@admin.com";
//     try {
//         const response = await axios.post('http://localhost:3001/login', {
//           password:password,
//           email:email,
     
//           password: password, // Depending on your endpoint, you might hash the password server-side
//            // Specify roles as per your application's requirements
        
//         });
//         console.log('Genesis user created:', response.data);
       
//         const 
//         const logout=await axios.post('http://localhost:3001/logout',{},{
//             headers: {
//                 'Authorization': `Bearer ${response.data.token}`
//               }
//         })
//       } catch (error) {
//         console.error('Failed to create genesis user:', error.response.data);
//       }

// }
// ModifyRoles();