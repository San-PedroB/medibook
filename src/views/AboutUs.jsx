// src/views/AboutUs.jsx
import React from "react";

function AboutUs() {
  return (
    <div className="about-us-page container py-5">
      {/* Hero Section */}
      <header className="text-center mb-5">
        <h1 className="display-4 fw-bold">Sobre MediBook</h1>
        <p className="lead text-muted fw-bold">
          Cuidamos tu salud con innovación y tecnología desde 2020.
        </p>
      </header>

      {/* Historia */}
      <section className="row align-items-center mb-5">
        <div className="col-md-6">
        <img
            className="d-block w-100"
            src="https://cdn.lecturio.com/assets/Featured-image-Student-Blog-Hospital-Team.jpg"
            alt="Descripción"
            style={{ height: '340px', objectFit: 'cover', borderRadius: '12px' }}/>
        </div>
        <div className="col-md-6">
          <h2 className="h4 fw-bold">Nuestra Historia</h2>
          <p className="fw-bold">
            MediBook nació en Santiago de Chile como respuesta a la mala gestión y creciente necesidad de digitalizar las citas médicas. Con un enfoque centrado en el usuario, desarrollamos una plataforma moderna para conectar pacientes, médicos y clínicas.
          </p>
        </div>
      </section>

      {/* Misión y visión */}
      <section className="row align-items-center mb-5 flex-md-row-reverse">
        <div className="col-md-6">
        <img
            className="d-block w-100"
            src="https://img.freepik.com/psd-gratis/interior-oficina-medica-moderna-lugar-trabajo-doctor39s-ia-generativa_587448-2136.jpg?w=1380&t=st=1686727166~exp=1686727766~hmac=591c268d51f177b345239686726cb29727776afcf802b2ff891ac49ee9088ebb"
            alt="Descripción"
            style={{ height: '340px', objectFit: 'cover', borderRadius: '12px' }}/>
        </div>
        <div className="col-md-6">
          <h2 className="h4 fw-bold">Nuestra Misión</h2>
          <p className="fw-bold">
          En MediBook, nuestra misión es optimizar el tiempo de todos: pacientes, médicos y empresas. Lo hacemos mediante una plataforma clara y eficiente, eliminando retrasos, mejorando la comunicación y reduciendo errores en la programación de citas.
          </p> <br />
          <ul className="list-unstyled fw-bold">
            <li>🏢 Casa Central: Santiago, Chile</li>
            <li>📞 Contacto: +56 9 1234 5678</li>
            <li>✉️ Email: contacto@medibook.com</li>
          </ul>
        </div>
      </section>

      {/* CTA Final */}
      <section className="text-center py-4 border-top fw-bold">
        <h4 className="mb-3 fw-bold">¿Quieres saber más?</h4>
        <p className="text-muted">Contáctanos o únete a nuestra red de profesionales médicos.</p>
        <a href="/" className="btn btn-primary">Contáctanos</a>
      </section>
    </div>
  );
}

export default AboutUs;
