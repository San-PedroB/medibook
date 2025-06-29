// src/components/appointments/CreateAppointmentForm.jsx
import React, { useState, useEffect } from "react";
import TextInput from "../formElements/TextInput";
import SubmitButton from "../formElements/SubmitButton";
import { createAppointment } from "../../services/appointmentService";
import { getPatientsByCompany } from "../../services/patientService";
import { getDoctorsByCompanyId } from "../../services/doctorService";
import { useAuth } from "../../context/AuthContext";

export default function CreateAppointmentForm({ initialDate, onSubmit, onCancel }) {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [form, setForm] = useState({
    patientId: "",
    patientName: "",
    doctorId: "",
    doctorName: "",
    start: initialDate ? initialDate + "T09:00" : "",
    end: initialDate ? initialDate + "T09:30" : "",
    notes: "",
    status: "vigente",
  });

  useEffect(() => {
    async function fetchData() {
      if (!user?.companyId) return;
      const pacientes = await getPatientsByCompany(user.companyId);
      const doctores = await getDoctorsByCompanyId(user.companyId);
      setPatients(pacientes);
      setDoctors(doctores);
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    if (initialDate) {
      setForm(f => ({
        ...f,
        start: initialDate + "T09:00",
        end: initialDate + "T09:30",
      }));
    }
  }, [initialDate]);

  // 🔹 Handlers para select
  const handlePatientChange = (e) => {
    const selectedId = e.target.value;
    const selectedPatient = patients.find(p => p.id === selectedId);
    setForm(f => ({
      ...f,
      patientId: selectedId,
      patientName: selectedPatient ? `${selectedPatient.firstName} ${selectedPatient.lastNameP} ${selectedPatient.lastNameM}` : ""
    }));
  };

  const handleDoctorChange = (e) => {
    const selectedId = e.target.value;
    const doctor = doctors.find(d => d.id === selectedId);
    setForm(f => ({
      ...f,
      doctorId: selectedId,
      doctorName: doctor ? `${doctor.firstName} ${doctor.paternalLastName} ${doctor.maternalLastName}` : ""
    }));
    setSelectedDoctor(doctor || null); // ACTUALIZA el doctor seleccionado para mostrar especialidad
  };

  // 🔹 Handler para campos básicos
  const handleChange = (name, value) => {
    setForm(f => ({
      ...f,
      [name]: value,
    }));
  };

  // 🔹 Guardar cita
  const handleSubmit = async e => {
    e.preventDefault();
    await createAppointment({
      ...form,
      companyId: user.companyId
    });
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Paciente */}
      <div className="mb-2">
        <label>Paciente</label>
        <select
          className="form-control"
          value={form.patientId}
          onChange={handlePatientChange}
          required
        >
          <option value="">Selecciona un paciente</option>
          {patients.map(p => (
            <option key={p.id} value={p.id}>
              {p.firstName} {p.lastNameP} {p.lastNameM}
            </option>
          ))}
        </select>
      </div>

      {/* Doctor */}
      <div className="mb-2">
        <label>Doctor/a</label>
        <select
          className="form-control"
          value={form.doctorId}
          onChange={handleDoctorChange}
          required
        >
          <option value="">Selecciona un doctor</option>
          {doctors.map(d => (
            <option key={d.id} value={d.id}>
              {d.firstName} {d.paternalLastName} {d.maternalLastName}
            </option>
          ))}
        </select>
      </div>

      {/* Especialidad solo si hay doctor seleccionado */}
      {selectedDoctor && (
        <div className="mb-2">
          <strong>Especialidad:</strong>{" "}
          {Array.isArray(selectedDoctor.specialties)
            ? selectedDoctor.specialties.join(" / ")
            : selectedDoctor.specialty || "-"}
        </div>
      )}

      {/* Fechas */}
      <div className="row">
        <div className="col">
          <label>Inicio</label>
          <input
            type="datetime-local"
            className="form-control"
            value={form.start}
            onChange={e => handleChange("start", e.target.value)}
            required
          />
        </div>
        <div className="col">
          <label>Término</label>
          <input
            type="datetime-local"
            className="form-control"
            value={form.end}
            onChange={e => handleChange("end", e.target.value)}
            required
          />
        </div>
      </div>

      <TextInput
        label="Notas"
        value={form.notes}
        onChange={e => handleChange("notes", e.target.value)}
      />

      {/* Estado */}
      <div className="mt-2">
        <label>Estado de la cita</label>
        <select
          className="form-control"
          value={form.status}
          onChange={e => handleChange("status", e.target.value)}
          required
        >
          <option value="vigente">Vigente</option>
          <option value="cancelada">Cancelada</option>
        </select>
      </div>

      <div className="d-flex justify-content-end mt-3">
        <SubmitButton text="Crear Cita" />
        <button type="button" className="btn btn-secondary ms-2" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
