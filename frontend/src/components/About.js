import React, { useState, useEffect } from 'react';
import { FaUsers, FaTrophy, FaHeart, FaStar } from 'react-icons/fa';
import './About.css';

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await fetch('/api/about');
      const data = await response.json();
      setAboutData(data);
    } catch (error) {
      console.error('Error fetching about data:', error);
      // Datos por defecto si falla la API
      setAboutData({
        title: "Quiénes Somos",
        description: "GymFit es más que un gimnasio, es una comunidad dedicada a transformar vidas a través del fitness y el bienestar. Fundado en 2020, hemos ayudado a miles de personas a alcanzar sus objetivos de salud y fitness.",
        mission: "Nuestra misión es proporcionar un ambiente motivador y profesional donde cada persona pueda alcanzar su máximo potencial físico y mental.",
        values: [
          "Excelencia en el servicio",
          "Comunidad y apoyo mutuo",
          "Innovación en fitness",
          "Compromiso con la salud",
          "Diversidad e inclusión"
        ],
        stats: {
          members: 1500,
          trainers: 15,
          classes_per_week: 50,
          years_experience: 4
        }
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="about" className="section about">
        <div className="container">
          <div className="loading">Cargando información...</div>
        </div>
      </section>
    );
  }

  if (!aboutData) {
    return (
      <section id="about" className="section about">
        <div className="container">
          <div className="error">Error al cargar la información</div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{aboutData.title}</h2>
          <p className="section-subtitle">
            Descubre la historia y valores que hacen de GymFit tu mejor opción para alcanzar tus objetivos
          </p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <div className="about-description">
              <p>{aboutData.description}</p>
              <p className="mission-text">
                <strong>Nuestra Misión:</strong> {aboutData.mission}
              </p>
            </div>

            <div className="values-section">
              <h3>Nuestros Valores</h3>
              <div className="values-grid">
                {aboutData.values.map((value, index) => (
                  <div key={index} className="value-item">
                    <div className="value-icon">
                      {index === 0 && <FaStar />}
                      {index === 1 && <FaUsers />}
                      {index === 2 && <FaTrophy />}
                      {index === 3 && <FaHeart />}
                      {index === 4 && <FaStar />}
                    </div>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="about-stats">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">
                  <FaUsers />
                </div>
                <div className="stat-content">
                  <div className="stat-number">{aboutData.stats.members}+</div>
                  <div className="stat-label">Miembros Activos</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <FaTrophy />
                </div>
                <div className="stat-content">
                  <div className="stat-number">{aboutData.stats.trainers}</div>
                  <div className="stat-label">Entrenadores Certificados</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <FaHeart />
                </div>
                <div className="stat-content">
                  <div className="stat-number">{aboutData.stats.classes_per_week}+</div>
                  <div className="stat-label">Clases por Semana</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <FaStar />
                </div>
                <div className="stat-content">
                  <div className="stat-number">{aboutData.stats.years_experience}</div>
                  <div className="stat-label">Años de Experiencia</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="about-features">
          <div className="feature-item">
            <div className="feature-icon">🏋️‍♂️</div>
            <h3>Equipamiento de Última Generación</h3>
            <p>Contamos con la mejor tecnología en equipos de fitness para maximizar tu entrenamiento.</p>
          </div>

          <div className="feature-item">
            <div className="feature-icon">👥</div>
            <h3>Comunidad Inclusiva</h3>
            <p>Un ambiente acogedor donde todos son bienvenidos, sin importar tu nivel de experiencia.</p>
          </div>

          <div className="feature-item">
            <div className="feature-icon">🎯</div>
            <h3>Resultados Garantizados</h3>
            <p>Nuestros programas están diseñados para que veas resultados reales y sostenibles.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
