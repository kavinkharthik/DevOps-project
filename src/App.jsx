import { useState } from 'react'
import './App.css'
import TodoLayout from './components/TodoLayout'
import Login from './components/Login'
import Register from './components/Register'

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    setUser({ name: 'User' });
    setCurrentPage('todos');
  };

  const handleRegister = () => {
    setUser({ name: 'New User' });
    setCurrentPage('todos');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('login');
  };

  return (
    <div className="app-container">
      {currentPage === 'login' && (
        <Login 
          onLogin={handleLogin} 
          navigateToRegister={() => setCurrentPage('register')} 
        />
      )}
      
      {currentPage === 'register' && (
        <Register 
          onRegister={handleRegister} 
          navigateToLogin={() => setCurrentPage('login')} 
        />
      )}

      {currentPage === 'todos' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '10px' }}>
            <button 
              onClick={handleLogout}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#cbd5e1',
                padding: '0.4rem 1rem',
                borderRadius: '99px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '0.85rem'
              }}
              onMouseOver={e => { e.target.style.background = 'rgba(255,255,255,0.1)'; e.target.style.color = 'white'; }}
              onMouseOut={e => { e.target.style.background = 'transparent'; e.target.style.color = '#cbd5e1'; }}
            >
              Logout
            </button>
          </div>
          <TodoLayout />
        </>
      )}
    </div>
  )
}

export default App
