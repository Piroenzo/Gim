import React from 'react';
import { FaDumbbell, FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaArrowUp } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <FaDumbbell className="logo-icon" />
              <span className="logo-text">GymFit</span>
            </div>
            <p className="footer-description">
              Transformamos vidas a través del fitness y el bienestar. 
              Únete a nuestra comunidad y descubre tu verdadero potencial.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <FaYoutube />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Enlaces Rápidos</h3>
                                <ul className="footer-links">
                      <li><a href="#about">Quiénes Somos</a></li>
                      <li><a href="#schedule">Horarios</a></li>
                      <li><a href="#location">Ubicación</a></li>
                      <li><a href="#contact">Contacto</a></li>
                    </ul>
          </div>

          <div className="footer-section">
            <h3>Servicios</h3>
                                <ul className="footer-links">
                      <li><a href="#schedule">Clases Grupales</a></li>
                      <li><a href="#schedule">Entrenamiento Personal</a></li>
                      <li><a href="#schedule">Acceso 24/7</a></li>
                      <li><a href="#schedule">Plan Nutricional</a></li>
                      <li><a href="#schedule">Sauna y Duchas</a></li>
                    </ul>
          </div>

          <div className="footer-section">
            <h3>Horarios</h3>
            <div className="footer-hours">
              <div className="hour-item">
                <span className="day">Lunes - Viernes:</span>
                <span className="time">06:00 - 23:00</span>
              </div>
              <div className="hour-item">
                <span className="day">Sábado:</span>
                <span className="time">08:00 - 22:00</span>
              </div>
              <div className="hour-item">
                <span className="day">Domingo:</span>
                <span className="time">08:00 - 20:00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-info">
            <p>&copy; {currentYear} GymFit. Todos los derechos reservados.</p>
            <div className="footer-legal">
              <a href="#">Política de Privacidad</a>
              <a href="#">Términos y Condiciones</a>
              <a href="#">Política de Cookies</a>
            </div>
          </div>
          
          <button className="scroll-to-top" onClick={scrollToTop} aria-label="Volver arriba">
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
