// src/views/AppointmentsCalendar.jsx
import React from "react";
import CalendarView from "../../components/calendar/CalendarView";

export default function AppointmentsCalendar() {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Calendario de Citas</h1>
      <CalendarView />
    </div>
  );
}
