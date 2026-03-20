import React, { useState } from 'react';
import './Auth.css';

const Register = ({ onRegister, navigateToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password) {
      onRegister();
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Create Account</h2>
      <p className="auth-subtitle">Join to organize your day beautifully</p>
      
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input 
            type="text" 
            className="auth-input" 
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input 
            type="email" 
            className="auth-input" 
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input 
            type="password" 
            className="auth-input" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-submit">Sign Up</button>
      </form>
      
      <p className="auth-footer">
        Already have an account? <span className="auth-link" onClick={navigateToLogin}>Login</span>
      </p>
    </div>
  );
};
export default Register;
