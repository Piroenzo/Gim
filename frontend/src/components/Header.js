import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaDumbbell } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo" onClick={() => scrollToSection('hero')}>
            <FaDumbbell className="logo-icon" />
            <span className="logo-text">GymFit</span>
          </div>

          <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
            <ul className="nav-list">
              <li><button onClick={() => scrollToSection('about')}>Quiénes Somos</button></li>
              <li><button onClick={() => scrollToSection('schedule')}>Horarios</button></li>
              <li><button onClick={() => scrollToSection('location')}>Ubicación</button></li>
              <li><button onClick={() => scrollToSection('contact')}>Contacto</button></li>
            </ul>
          </nav>

                            <div className="header-actions">
                    <button className="btn btn-primary" onClick={() => scrollToSection('contact')}>
                      Únete Ahora
                    </button>
                  </div>

          <button className="mobile-menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
