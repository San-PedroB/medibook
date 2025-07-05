import React, { useState, useEffect } from "react";
import TextInput from "../formElements/TextInput";
import SubmitButton from "../formElements/SubmitButton";
import AutocompleteInput from "../formElements/AutocompleteInput";
import DateTimePicker from "../formElements/DateTimePicker";
import { createAppointment } from "../../services/appointmentService";
import { getPatientsByCompany } from "../../services/patientService";
import { getDoctorsByCompanyId } from "../../services/doctorService";
import { useAuth } from "../../context/AuthContext";

export default function CreateAppointmentForm({
  initialDate,
  onSubmit,
  onCancel,
  events = [],
}) {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Maneja las fechas como objetos Date
  const [form, setForm] = useState({
    patientId: "",
    patientName: "",
    doctorId: "",
    doctorName: "",
    start: initialDate ? new Date(initialDate + "T09:00") : new Date(),
    end: initialDate ? new Date(initialDate + "T09:30") : new Date(),
    notes: "",
    status: "vigente",
  });

  const [errorMessage, setErrorMessage] = useState("");

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
      setForm((f) => ({
        ...f,
        start: new Date(initialDate + "T09:00"),
        end: new Date(initialDate + "T09:30"),
      }));
    }
  }, [initialDate]);

  useEffect(() => {
    if (selectedPatient) {
      setForm((f) => ({
        ...f,
        patientId: selectedPatient.id,
        patientName: `${selectedPatient.firstName} ${selectedPatient.lastNameP} ${selectedPatient.lastNameM}`,
      }));
    } else {
      setForm((f) => ({
        ...f,
        patientId: "",
        patientName: "",
      }));
    }
  }, [selectedPatient]);

  const handleDoctorChange = (e) => {
    const selectedId = e.target.value;
    const doctor = doctors.find((d) => d.id === selectedId);
    setForm((f) => ({
      ...f,
      doctorId: selectedId,
      doctorName: doctor
        ? `${doctor.firstName} ${doctor.paternalLastName} ${doctor.maternalLastName}`
        : "",
    }));
    setSelectedDoctor(doctor || null);
  };

  const handleChange = (name, value) => {
    setForm((f) => ({
      ...f,
      [name]: value,
    }));
  };

  function doIntervalsOverlap(startA, endA, startB, endB) {
    return startA < endB && endA > startB;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Valida solapamiento antes de crear la cita
    const startB = form.start;
    const endB = form.end;

    const isDoctorBusy = events.some((ev) => {
      const status = (ev.status || "").toLowerCase();
      const ocupado = status !== "cancelada";
      const startA = new Date(ev.start);
      const endA = new Date(ev.end);
      return (
        ev.doctorId === form.doctorId &&
        ocupado &&
        doIntervalsOverlap(startA, endA, startB, endB)
      );
    });

    if (isDoctorBusy) {
      setErrorMessage("El médico ya tiene una cita en ese horario.");
      return;
    }

    // Guarda las fechas como objeto Date (el servicio las convierte a Timestamp)
    await createAppointment({
      ...form,
      companyId: user.companyId,
    });
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && (
        <div className="alert alert-danger text-center">{errorMessage}</div>
      )}

      {/* Paciente */}
      <div className="mb-2">
        <label>Paciente</label>
        <AutocompleteInput
          options={patients}
          getOptionLabel={(p) =>
            `${p.firstName} ${p.lastNameP} ${p.lastNameM}`
          }
          value={selectedPatient}
          setValue={setSelectedPatient}
          placeholder="Buscar paciente..."
          required
        />
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
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              {d.firstName} {d.paternalLastName} {d.maternalLastName}
            </option>
          ))}
        </select>
      </div>

      {/* Especialidad */}
      {selectedDoctor && (
        <div className="mb-2">
          <strong>Especialidad:</strong>{" "}
          {Array.isArray(selectedDoctor.specialties)
            ? selectedDoctor.specialties.join(" / ")
            : selectedDoctor.specialty || "-"}
        </div>
      )}

      {/* Fecha y hora */}
      <div className="row">
        <div className="col">
          <DateTimePicker
            label="Inicio"
            value={form.start}
            onChange={date => setForm(f => ({ ...f, start: date }))}
            required
            showTime={true}
          />
        </div>
        <div className="col">
        <DateTimePicker
          label="Termino"
          value={form.end}
          onChange={date => setForm(f => ({ ...f, end: date }))}
          required
          showTime={true}
        />
        </div>
      </div>

      <TextInput
        label="Notas"
        value={form.notes}
        onChange={(e) => handleChange("notes", e.target.value)}
      />

      <div className="mt-2">
        <label>Estado de la cita</label>
        <select
          className="form-control"
          value={form.status}
          onChange={(e) => handleChange("status", e.target.value)}
          required
        >
          <option value="vigente">Vigente</option>
          <option value="cancelada">Cancelada</option>
        </select>
      </div>

      <div className="d-flex justify-content-end mt-3">
        <SubmitButton text="Crear Cita" />
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={onCancel}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
