import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaDirections } from 'react-icons/fa';
import './Location.css';

const Location = () => {
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLocationData();
  }, []);

  const fetchLocationData = async () => {
    try {
      const response = await fetch('/api/location');
      const data = await response.json();
      setLocationData(data);
    } catch (error) {
      console.error('Error fetching location data:', error);
      // Datos por defecto si falla la API
      setLocationData({
        address: "Av. Principal 1234, Centro Comercial Plaza Mayor",
        city: "Buenos Aires",
        province: "CABA",
        postal_code: "1001",
        phone: "+54 11 1234-5678",
        email: "info@gymfit.com",
        coordinates: {
          lat: -34.6037,
          lng: -58.3816
        },
        hours: {
          monday: "06:00 - 23:00",
          tuesday: "06:00 - 23:00",
          wednesday: "06:00 - 23:00",
          thursday: "06:00 - 23:00",
          friday: "06:00 - 23:00",
          saturday: "08:00 - 22:00",
          sunday: "08:00 - 20:00"
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const openGoogleMaps = () => {
    const { lat, lng } = locationData.coordinates;
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const openWaze = () => {
    const { lat, lng } = locationData.coordinates;
    const url = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <section id="location" className="section location">
        <div className="container">
          <div className="loading">Cargando información de ubicación...</div>
        </div>
      </section>
    );
  }

  if (!locationData) {
    return (
      <section id="location" className="section location">
        <div className="container">
          <div className="error">Error al cargar la información de ubicación</div>
        </div>
      </section>
    );
  }

  return (
    <section id="location" className="section location">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Ubicación y Horarios</h2>
          <p className="section-subtitle">
            Encuentra fácilmente nuestro gimnasio y conoce nuestros horarios de atención
          </p>
        </div>

        <div className="location-content">
          <div className="location-info">
            <div className="info-card">
              <div className="info-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="info-content">
                <h3>Dirección</h3>
                <p>{locationData.address}</p>
                <p>{locationData.city}, {locationData.province} {locationData.postal_code}</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <FaPhone />
              </div>
              <div className="info-content">
                <h3>Teléfono</h3>
                <p>{locationData.phone}</p>
                <a href={`tel:${locationData.phone}`} className="contact-link">
                  Llamar ahora
                </a>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <FaEnvelope />
              </div>
              <div className="info-content">
                <h3>Email</h3>
                <p>{locationData.email}</p>
                <a href={`mailto:${locationData.email}`} className="contact-link">
                  Enviar email
                </a>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <FaClock />
              </div>
              <div className="info-content">
                <h3>Horarios de Atención</h3>
                <div className="hours-list">
                  <div className="hour-item">
                    <span className="day">Lunes - Viernes:</span>
                    <span className="time">{locationData.hours.monday}</span>
                  </div>
                  <div className="hour-item">
                    <span className="day">Sábado:</span>
                    <span className="time">{locationData.hours.saturday}</span>
                  </div>
                  <div className="hour-item">
                    <span className="day">Domingo:</span>
                    <span className="time">{locationData.hours.sunday}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="location-map">
            <div className="map-container">
              <div className="map-placeholder">
                <div className="map-content">
                  <FaMapMarkerAlt className="map-icon" />
                  <h3>GymFit</h3>
                  <p>{locationData.address}</p>
                  <p>{locationData.city}, {locationData.province}</p>
                  
                  <div className="map-actions">
                    <button className="btn btn-primary" onClick={openGoogleMaps}>
                      <FaDirections />
                      Abrir en Google Maps
                    </button>
                    <button className="btn btn-secondary" onClick={openWaze}>
                      <FaDirections />
                      Abrir en Waze
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="location-features">
          <div className="feature-item">
            <div className="feature-icon">🚗</div>
            <h3>Estacionamiento Gratuito</h3>
            <p>Amplio estacionamiento disponible para todos nuestros miembros.</p>
          </div>

          <div className="feature-item">
            <div className="feature-icon">🚇</div>
            <h3>Acceso por Transporte Público</h3>
            <p>Múltiples líneas de colectivo y estaciones de subte cercanas.</p>
          </div>

          <div className="feature-item">
            <div className="feature-icon">🛒</div>
            <h3>Centro Comercial</h3>
            <p>Ubicado en un centro comercial con restaurantes y tiendas.</p>
          </div>

          <div className="feature-item">
            <div className="feature-icon">🌳</div>
            <h3>Área Residencial</h3>
            <p>Zona segura y tranquila, perfecta para tu entrenamiento.</p>
          </div>
        </div>

        <div className="directions-section">
          <h3>¿Cómo llegar?</h3>
          <div className="directions-content">
            <div className="direction-method">
              <h4>🚗 En Auto</h4>
              <p>Desde el centro: Toma la Av. 9 de Julio hacia el sur, gira en la Av. Principal y continúa hasta el km 1234.</p>
            </div>
            
            <div className="direction-method">
              <h4>🚇 En Subte</h4>
              <p>Línea A: Baja en la estación "Plaza Mayor" y camina 2 cuadras hacia el oeste.</p>
            </div>
            
            <div className="direction-method">
              <h4>🚌 En Colectivo</h4>
              <p>Líneas 10, 17, 45: Baja en la parada "Centro Comercial Plaza Mayor".</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
