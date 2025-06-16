import React from 'react';
import { Carousel } from 'react-bootstrap';

const UserDashboard = () => {
  return (
    <div
      className="user-dashboard container mt-5"
      style={{
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(to right, #f7f7f7, #e0f7ff)',
        padding: '40px',
        borderRadius: '20px',
      }}
    >
      {/* Texto a la izquierda */}
      <div style={{ flex: 1, paddingRight: '40px' }}>
        <h1 style={{ color: '#1e1e1e', fontWeight: 'bold', fontSize: '2.8rem' }}>
          MediBook
        </h1>
        <p style={{ color: '#333', fontSize: '1.2rem', marginTop: '20px' }}>
          Ya seas paciente, farmacia, médico, clínica u hospital, MediBook está hecho para ti.
          Somos una plataforma en línea diseñada para agendar tus citas médicas.
        </p>
      </div>

      {/* Carrusel a la derecha */}
      <div style={{ flex: 1 }}>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://didoctorio.com/wp-content/uploads/2023/08/medico-paciente-sentados-frente-al-otro-escritorio-clinica-foco-manos-medica-que-apuntan-al-monitor-computadora-portatil-cerca-concepto-medicina-scaled-1300x731.jpg"
              alt="Imagen 1"
              style={{ height: '340px', objectFit: 'cover', borderRadius: '12px' }}
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://img.freepik.com/foto-gratis/doctor-tableta-digital_1098-18240.jpg?semt=ais_hybrid&w=740"
              alt="Imagen 2"
              style={{ height: '340px', objectFit: 'cover', borderRadius: '12px' }}
            />
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default UserDashboard;
