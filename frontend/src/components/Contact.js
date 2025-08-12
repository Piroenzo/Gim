import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: 'Dirección',
      content: 'Av. Principal 1234, Centro Comercial Plaza Mayor, Buenos Aires, CABA',
      action: 'Ver en mapa',
      actionLink: '#location'
    },
    {
      icon: <FaPhone />,
      title: 'Teléfono',
      content: '+54 11 1234-5678',
      action: 'Llamar ahora',
      actionLink: 'tel:+541112345678'
    },
    {
      icon: <FaEnvelope />,
      title: 'Email',
      content: 'info@gymfit.com',
      action: 'Enviar email',
      actionLink: 'mailto:info@gymfit.com'
    },
    {
      icon: <FaClock />,
      title: 'Horarios',
      content: 'Lun-Vie: 06:00-23:00 | Sáb: 08:00-22:00 | Dom: 08:00-20:00',
      action: 'Ver horarios',
      actionLink: '#schedule'
    }
  ];

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Contáctanos</h2>
          <p className="section-subtitle">
            ¿Tienes alguna pregunta? Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos pronto.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h3>Información de Contacto</h3>
            <p className="contact-description">
              Estamos disponibles para responder todas tus consultas sobre membresías, 
              clases, horarios o cualquier otra información que necesites.
            </p>

            <div className="contact-cards">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-card">
                  <div className="contact-icon">
                    {info.icon}
                  </div>
                  <div className="contact-details">
                    <h4>{info.title}</h4>
                    <p>{info.content}</p>
                    <a 
                      href={info.actionLink} 
                      className="contact-action"
                      onClick={(e) => {
                        if (info.actionLink.startsWith('#')) {
                          e.preventDefault();
                          const element = document.querySelector(info.actionLink);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }
                      }}
                    >
                      {info.action}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-features">
              <div className="feature-item">
                <div className="feature-icon">💬</div>
                <h4>Respuesta Rápida</h4>
                <p>Te respondemos en menos de 24 horas</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">👥</div>
                <h4>Atención Personalizada</h4>
                <p>Cada consulta es importante para nosotros</p>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <div className="form-header">
              <h3>Envíanos un Mensaje</h3>
              <p>Completa el formulario y nos pondremos en contacto contigo</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              {submitStatus === 'success' && (
                <div className="success">
                  ¡Gracias por tu mensaje! Te contactaremos pronto.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="error">
                  Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.
                </div>
              )}

              <div className="form-group">
                <label htmlFor="name">Nombre Completo *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Tu nombre completo"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="tu@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+54 11 1234-5678"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Mensaje *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-large submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Enviar Mensaje
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="contact-cta">
          <h3>¿Listo para comenzar tu transformación?</h3>
          <p>Únete a GymFit hoy y descubre tu verdadero potencial</p>
          <div className="cta-buttons">
                                <button
                      className="btn btn-primary btn-large"
                      onClick={() => {
                        const element = document.getElementById('schedule');
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Ver Horarios
                    </button>
            <button 
              className="btn btn-secondary btn-large"
              onClick={() => {
                const element = document.getElementById('schedule');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Ver Horarios
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
