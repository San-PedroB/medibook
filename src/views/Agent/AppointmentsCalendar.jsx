import React from "react";
import CalendarView from "../../components/calendar/CalendarView";

export default function AppointmentsCalendar() {
  return (
    <div className="container py-4">
      <h2 className="mb-4">Calendario de Citas (Agente)</h2>
      <CalendarView userRole="agent" />
    </div>
  );
}
