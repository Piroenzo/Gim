import React from 'react';
import { FaArrowDown, FaPlay } from 'react-icons/fa';
import './Hero.css';

const Hero = ({ quote }) => {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Transforma tu vida con
              <span className="text-primary"> GymFit</span>
            </h1>
            
            <p className="hero-description">
              Descubre el poder de tu potencial físico y mental. En GymFit, 
              no solo te ayudamos a alcanzar tus objetivos de fitness, 
              sino que construimos una comunidad que te motiva a ser mejor cada día.
            </p>

            <div className="hero-actions">
                                    <button className="btn btn-primary btn-large" onClick={() => {
                        const element = document.getElementById('contact');
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                      }}>
                        Comenzar Ahora
                      </button>
              
              <button className="btn btn-secondary btn-large">
                <FaPlay className="play-icon" />
                Ver Video
              </button>
            </div>

            {quote && quote.text && (
              <div className="hero-quote">
                <div className="quote-icon">💪</div>
                <blockquote>
                  "{quote.text}"
                </blockquote>
                <cite>— {quote.author}</cite>
              </div>
            )}
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">1500+</div>
              <div className="stat-label">Miembros</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15</div>
              <div className="stat-label">Entrenadores</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Clases Semanales</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4</div>
              <div className="stat-label">Años de Experiencia</div>
            </div>
          </div>
        </div>
      </div>

      <button className="scroll-down" onClick={scrollToAbout}>
        <FaArrowDown />
        <span>Descubre más</span>
      </button>
    </section>
  );
};

export default Hero;

