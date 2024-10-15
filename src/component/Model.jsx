import React from 'react';
import '../App.css'; // Create a CSS file for styling if needed

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Logout</h2>
        <p>Are you sure you want to logout?</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
