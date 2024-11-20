import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    phoneNumber: '',
    address: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    try{
      // const response = await axios.post('http://localhost:5000/api/register', formData);
      const response = await axios.post('https://ecommerce-backend-59dz.onrender.com/common-backend/api/registerForm', formData);

      console.log("Response",response.data);
      alert("user has been registered");
    }catch(error){
      console.error('error in registration',error);
      alert("failed to register user");
    }
    // Add form submission logic here
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <h2>Register New User</h2>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter your name" />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Enter your password" />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password *</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required placeholder="Confirm your password" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="gender">Gender *</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number *</label>
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required placeholder="Enter your phone number" />
        </div>
      </div>

      <div className="form-row address-row">
        <div className="form-group address-input">
          <label htmlFor="address">Address *</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required placeholder="Enter your address" />
        </div>
        <button type="button" className="fetch-address-btn">Fetch Address</button>
      </div>

      <button type="submit" className="submit-btn">Sign up</button>

      <p>Already have an account? <a href="/user">Login</a></p>
    </form>
  );
};

export default RegistrationForm;
