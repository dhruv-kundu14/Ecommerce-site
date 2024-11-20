// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const UserLogin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:5001/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         console.log(data.message); // Login successful
//         // Store token in localStorage
//         localStorage.setItem('jwtToken', data.token);
//         navigate('/'); // Redirect to a protected route
//       } else {
//         alert(data.message); // Show error message
//       }
//     } catch (error) {
//       console.error('Error logging in:', error);
//       alert('Error logging in. Please try again.');
//     }
//   };

//   const handleRegisterClick = (e) => {
//     e.preventDefault();
//     navigate('/register');
//   };

//   return (
//     <div className='login'>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div className='login-box'>
//           <div className='login-input'>
//             <div className='label'>
//               <label>Email</label>
//             </div>
//             <input
//               type='email'
//               placeholder='Enter email'
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <div className='label'>
//               <label>Password</label>
//             </div>
//             <input
//               type='password'
//               placeholder='Enter password'
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div className='login-btn'>
//             <button type='submit'>Login</button>
//           </div>
//           <div className='register-btn'>
//             <button onClick={handleRegisterClick}>Register</button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UserLogin;

// *******************************************************

// UserLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../server/AuthContext';
import { Link } from 'react-router-dom';

import {
  MDBBtn,
} from "mdb-react-ui-kit";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await fetch('http://localhost:5001/api/login', {
        const response = await fetch('https://ecommerce-backend-59dz.onrender.com/common-backend/api/loginForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message); // Login successful
        localStorage.setItem('jwtToken', data.token);
        login(data.token); // Pass token to login function
        navigate('/'); // Redirect to a protected route
      } else {
        alert(data.message); // Show error message
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error logging in. Please try again.');
    }
  };

  return (
    <div className="login-container">

    
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          type={showPassword ? 'text' : 'password'}
          label="Password"
          value={password}
          onChange={handlePasswordChange}
          required
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <MDBBtn type="submit" color="primary" className="mb-3">
          Login
        </MDBBtn>
        <p>
          Don't have an account?{" "}
          <Link to="/register" className="text-primary">
            Register here
          </Link>
        </p>
      </form>
    </div>
    </div>
  );
};

export default UserLogin;
