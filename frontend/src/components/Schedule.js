import React, { useState, useEffect } from 'react';
import { FaClock, FaUser, FaDumbbell } from 'react-icons/fa';
import './Schedule.css';

const Schedule = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState('Lunes');

  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  useEffect(() => {
    fetchScheduleData();
  }, []);

  const fetchScheduleData = async () => {
    try {
      const response = await fetch('/api/schedule');
      const data = await response.json();
      setScheduleData(data);
    } catch (error) {
      console.error('Error fetching schedule data:', error);
      // Datos por defecto si falla la API
      setScheduleData([
        { id: 1, class_name: 'Spinning', instructor: 'Carlos Rodríguez', time: '07:00', day: 'Lunes', duration: '45 min' },
        { id: 2, class_name: 'Yoga', instructor: 'Ana Martínez', time: '08:00', day: 'Lunes', duration: '60 min' },
        { id: 3, class_name: 'CrossFit', instructor: 'Miguel López', time: '18:00', day: 'Lunes', duration: '60 min' },
        { id: 4, class_name: 'Zumba', instructor: 'Sofia García', time: '19:00', day: 'Martes', duration: '45 min' },
        { id: 5, class_name: 'Pilates', instructor: 'Laura Torres', time: '20:00', day: 'Martes', duration: '60 min' },
        { id: 6, class_name: 'Boxeo', instructor: 'Roberto Silva', time: '18:00', day: 'Miércoles', duration: '60 min' },
        { id: 7, class_name: 'Spinning', instructor: 'Carlos Rodríguez', time: '07:00', day: 'Jueves', duration: '45 min' },
        { id: 8, class_name: 'Yoga', instructor: 'Ana Martínez', time: '08:00', day: 'Viernes', duration: '60 min' },
        { id: 9, class_name: 'CrossFit', instructor: 'Miguel López', time: '18:00', day: 'Sábado', duration: '60 min' },
        { id: 10, class_name: 'Zumba', instructor: 'Sofia García', time: '10:00', day: 'Domingo', duration: '45 min' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredClasses = scheduleData.filter(cls => cls.day === selectedDay);

  const getClassIcon = (className) => {
    const classIcons = {
      'Spinning': '🚴‍♀️',
      'Yoga': '🧘‍♀️',
      'CrossFit': '🏋️‍♂️',
      'Zumba': '💃',
      'Pilates': '🤸‍♀️',
      'Boxeo': '🥊'
    };
    return classIcons[className] || '🏃‍♀️';
  };

  if (loading) {
    return (
      <section id="schedule" className="section schedule">
        <div className="container">
          <div className="loading">Cargando horarios...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="schedule" className="section schedule">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Horarios de Clases</h2>
          <p className="section-subtitle">
            Planifica tu semana con nuestras clases variadas y horarios flexibles
          </p>
        </div>

        <div className="schedule-content">
          <div className="day-selector">
            {days.map(day => (
              <button
                key={day}
                className={`day-button ${selectedDay === day ? 'active' : ''}`}
                onClick={() => setSelectedDay(day)}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="schedule-grid">
            {filteredClasses.length > 0 ? (
              filteredClasses.map(cls => (
                <div key={cls.id} className="class-card">
                  <div className="class-header">
                    <div className="class-icon">
                      {getClassIcon(cls.class_name)}
                    </div>
                    <div className="class-info">
                      <h3 className="class-name">{cls.class_name}</h3>
                      <div className="class-details">
                        <span className="class-time">
                          <FaClock /> {cls.time}
                        </span>
                        <span className="class-duration">
                          <FaDumbbell /> {cls.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="class-instructor">
                    <FaUser />
                    <span>{cls.instructor}</span>
                  </div>

                  <button className="btn btn-primary btn-small">
                    Reservar Clase
                  </button>
                </div>
              ))
            ) : (
              <div className="no-classes">
                <p>No hay clases programadas para este día.</p>
                <p>¡Disfruta de un día de descanso o entrena por tu cuenta!</p>
              </div>
            )}
          </div>
        </div>

        <div className="schedule-info">
          <div className="info-card">
            <h3>Información Importante</h3>
            <ul>
              <li>Las clases tienen un límite de 20 personas</li>
              <li>Llega 10 minutos antes para calentar</li>
              <li>Trae tu propia botella de agua</li>
              <li>Reserva tu clase con 24 horas de anticipación</li>
            </ul>
          </div>

          <div className="info-card">
            <h3>Horarios del Gimnasio</h3>
            <div className="gym-hours">
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
      </div>
    </section>
  );
};

export default Schedule;
