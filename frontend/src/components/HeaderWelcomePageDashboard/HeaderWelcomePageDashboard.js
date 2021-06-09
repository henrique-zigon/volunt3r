import React from 'react';
import './headerWelcomePageDashboard.css';

const HeaderWelcomePageDashboard = props => {
  return (
    <header className="header-welcome">
      <div className="welcome">
        <span className="title">Olá, {props.username} 👋</span>
        <span className="subtitle">{props.subtitle}</span>
      </div>
      <span className="logo">Volunt3r</span>
    </header>
  );
}

export default HeaderWelcomePageDashboard;