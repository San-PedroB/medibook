import React from "react";
import CalendarView from "../../components/calendar/CalendarView";

export default function AdminAppointments() {
  return (
    <div className="container py-4">
      <h2 className="mb-4">Calendario de Citas (Administrador)</h2>
      <CalendarView userRole="admin" />
    </div>
  );
}
