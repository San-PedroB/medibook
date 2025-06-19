import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function CalendarView() {
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Cita con Dra. Soto',
      start: '2025-06-22T10:00:00',
      end: '2025-06-22T11:00:00',
    },
    {
      id: '2',
      title: 'Consulta control general',
      start: '2025-06-23T13:30:00',
      end: '2025-06-23T14:00:00',
    },
  ]);

  const handleDateClick = (info) => {
    alert(`Clic en la fecha: ${info.dateStr}`);
  };

  return (
    <div className="container mt-4">
      <h2>Calendario de Citas</h2>
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
        dateClick={handleDateClick}
        selectable={true}
      />
    </div>
  );
}
