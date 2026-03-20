import React, { useState } from 'react';
import './Auth.css';

const Login = ({ onLogin, navigateToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin();
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Welcome Back</h2>
      <p className="auth-subtitle">Login to access your sleek tasks</p>
      
      <form className="auth-form" onSubmit={handleSubmit}>
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
        <button type="submit" className="auth-submit">Login</button>
      </form>
      
      <p className="auth-footer">
        Don't have an account? <span className="auth-link" onClick={navigateToRegister}>Register</span>
      </p>
    </div>
  );
};
export default Login;
