import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { getAppointmentsByCompany, updateAppointmentStatus, deleteAppointment } from '../../services/appointmentService';
import CreateAppointmentModal from './CreateAppointmentModal';
import AppointmentDetailModal from '../appointments/AppointmentDetailModal';
import { useAuth } from "../../context/AuthContext";

export default function CalendarView({ userRole }) {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line
  }, []);

  const fetchAppointments = async () => {
    const citas = await getAppointmentsByCompany(user.companyId);
    setEvents(citas);
  };

  const handleDateClick = (info) => {
    // Solo permitir crear cita si el rol está permitido
    if (!["admin", "agent"].includes(userRole)) return;

    setSelectedDate(info.date);
    setShowModal(true);
  };

  const handleCreate = async (formData) => {
    setShowModal(false);
    await fetchAppointments();
  };

  const handleEventClick = (info) => {
    setSelectedAppointment({
      id: info.event.id,
      ...info.event.extendedProps,
      start: info.event.start,
      end: info.event.end,
    });
    setShowDetail(true);
  };

  function renderEventContent(eventInfo) {
    // ... (tu función renderEventContent completa, sin cambios)
    const patient = eventInfo.event.extendedProps.patientName || "Paciente";
    const doctorRaw = eventInfo.event.extendedProps.doctorName || "Médico";
    const doctorParts = doctorRaw.trim().split(' ');
    const doctorDisplay = doctorParts.length >= 2
      ? `${doctorParts[0]} ${doctorParts[1]}`
      : doctorParts[0];
    const specialtiesRaw = eventInfo.event.extendedProps.specialties;
    const specialty = Array.isArray(specialtiesRaw)
      ? specialtiesRaw.join(" / ") || "Especialidad"
      : specialtiesRaw || "Especialidad";
    const start = new Date(eventInfo.event.start);
    const end = new Date(eventInfo.event.end);
    const pad = num => String(num).padStart(2, "0");
    const startTime = `${pad(start.getHours())}:${pad(start.getMinutes())}`;
    const endTime = `${pad(end.getHours())}:${pad(end.getMinutes())}`;
    const horario = `${startTime} a ${endTime}`;
    const status = eventInfo.event.extendedProps.status || "Agendada";
    const statusColors = {
      Agendada: "#7986cb",
      "En progreso": "#29b6f6",
      Finalizada: "#43a047",
      Cancelada: "#e53935"
    };

    return (
      <div className="calendar-event-content">
        <div className="calendar-event-patient">{patient}</div>
        <div className="calendar-event-doctor">{doctorDisplay}</div>
        <div className="calendar-event-specialty">{specialty}</div>
        <div className="calendar-event-horario">{horario}</div>
        <div
          className="calendar-event-status"
          style={{
            background: statusColors[status] || "#7986cb",
            color: "#fff",
            borderRadius: "6px",
            padding: "2px 8px",
            display: "inline-block",
            marginTop: "4px",
            fontSize: "0.93rem",
            fontWeight: 600,
          }}
        >
          {status}
        </div>
      </div>
    );
  }

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        allDaySlot={false}
        events={events}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        selectable={true}
        height="auto"
      />
      <CreateAppointmentModal
        show={showModal}
        onHide={() => setShowModal(false)}
        initialDate={selectedDate}
        onCreate={handleCreate}
        events={events}
      />
      <AppointmentDetailModal
        show={showDetail}
        onHide={() => setShowDetail(false)}
        appointment={selectedAppointment}
        onChangeStatus={async (nuevoEstado) => {
          if (!selectedAppointment?.id) return;
          await updateAppointmentStatus(selectedAppointment.id, nuevoEstado);
          await fetchAppointments();
          setShowDetail(false);
        }}
        onDelete={async () => {
          if (!selectedAppointment?.id) return;
          if (window.confirm("¿Estás seguro de eliminar esta cita? Esta acción no se puede deshacer.")) {
            await deleteAppointment(selectedAppointment.id);
            await fetchAppointments();
            setShowDetail(false);
          }
        }}
      />
    </div>
  );
}
