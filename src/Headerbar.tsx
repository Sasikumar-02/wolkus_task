import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import './styles/Dashboard.css';

export interface HeaderbarProps {
  onToggleTheme: () => void;
  theme: string;
}

const Headerbar: React.FC<HeaderbarProps> = ({ onToggleTheme, theme }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loginData');
    navigate('/');
  };

  return (
    <div className="headerbar">
      <h1 style={{ textAlign: 'center', color: theme === 'light' ? '#0B4266' : '#fff', marginTop: '10px' }}>
        Movie App
      </h1>
      <div style={{ position: 'absolute', top: '10px', right: '50px', cursor: 'pointer' }} onClick={onToggleTheme}>
        <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} size="2x" color={theme === 'light' ? '#0B4266' : '#fff'} />
      </div>
      <div className="logout-icon" onClick={handleLogout} style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}>
        <FontAwesomeIcon icon={faSignOutAlt} size="2x" color={theme === 'light' ? '#0B4266' : '#fff'} />
      </div>
    </div>
  );
};

export default Headerbar;
