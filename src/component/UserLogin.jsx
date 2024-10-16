import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message); // Login successful
        // Store token in localStorage
        localStorage.setItem('jwtToken', data.token);
        navigate('/'); // Redirect to a protected route
      } else {
        alert(data.message); // Show error message
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error logging in. Please try again.');
    }
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  return (
    <div className='login'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className='login-box'>
          <div className='login-input'>
            <div className='label'>
              <label>Email</label>
            </div>
            <input
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className='label'>
              <label>Password</label>
            </div>
            <input
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className='login-btn'>
            <button type='submit'>Login</button>
          </div>
          <div className='register-btn'>
            <button onClick={handleRegisterClick}>Register</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserLogin;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; 

// const UserLogin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate(); // Initialize useNavigate

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

//       const token = response.data.token;

//       // Store token in localStorage
//       localStorage.setItem('jwtToken', token);

//       const data = await response.json();

//       if (response.ok) {
//         console.log(data.message); // Login successful
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
