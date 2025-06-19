import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import SignaturePad from '../../components/signaturepad/SignaturePad.jsx';

const DoctorDocument = () => {
  const pdfRef = useRef();

  const generatePDF = async () => {
    const input = pdfRef.current;
    const buttons = document.querySelectorAll('.hiddenbutton');
    buttons.forEach(btn => (btn.style.display = 'none'));

    const canvas = await html2canvas(input, { scrollY: -window.scrollY, scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('respaldo_cita.pdf');

    buttons.forEach(btn => (btn.style.display = ''));
  };

  return (
    <div className="document-container">
      <div ref={pdfRef} className="document-a4">
        <div className="header-doc">
          <img src="medibooklogox.png" className="logo-doc" alt="logo-medibook" />
          <h1 className="title-doc">Respaldo de Cita Médica</h1>
        </div>

        <p>
          Estimado/a paciente:
        </p>

        <p>
          Por medio del presente documento, se deja constancia de que usted ha agendado exitosamente una cita médica a través de la plataforma <strong>MediBook</strong>.
        </p>

        <p>
          Le recordamos que su compromiso y puntualidad son fundamentales para asegurar una atención adecuada y respetuosa para todos los pacientes.
          En caso de no poder asistir, le pedimos informar con anticipación para reagendar su consulta.
        </p>

        <p>
          La información de su cita es la siguiente:
        </p>

        <ul>
          <li><strong>Doctor/a:</strong> Dr. Juan Pérez</li>
          <li><strong>Especialidad:</strong> Medicina General</li>
          <li><strong>Fecha:</strong> 10 de junio de 2025</li>
          <li><strong>Hora:</strong> 09:30 hrs</li>
          <li><strong>Modalidad:</strong> Presencial</li>
          <li><strong>Centro Médico:</strong> Clínica Central - Av. Salud 123, Santiago</li>
        </ul>

        <p>
          Agradecemos su preferencia. En MediBook trabajamos cada día para brindarle un servicio médico de calidad, accesible y humano.
        </p>

        <p>
          Si necesita mayor información o asistencia, puede comunicarse con nosotros a través del correo: <strong>soporte@medibook.cl</strong> o llamando al <strong>+56 9 1234 5678</strong>.
        </p>

        <p>
          Atentamente,  
          <br />
          <strong>Equipo MediBook</strong>
        </p>

        <div className="firma-section">
          <div className="center"><strong><p>Firma del Doctor:</p></strong></div>
          <SignaturePad />
        </div>

        <p className="footer">
          Documento generado automáticamente mediante MediBook – {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="center">
        <button className="btn-descargar" onClick={generatePDF}>Descargar PDF</button>
      </div>
    </div>
  );
};

export default DoctorDocument;
