import React from "react";

export default function SpecialtySelect({
  name,
  label = "Especialidad",
  value = "",
  onChange = () => {},
  controlId,
  options = [],
  ...rest
}) {
  // Si no te pasan `options`, usa la lista default:
  const especialidades = options.length
    ? options
    : [
        "Medicina General",
        "Especialidades Médicas Avanzadas",
        "Psicología y Bienestar Mental",
        "Atención Pediatrica",
        "Salud Femenina",
        "Salud Masculina",
        "Cuidado Dental",
        "Terapias y Rehabilitación Física",
        "Exámenes Médicos y Laboratorio",
        "Otras Especialidadeeees"
      ];

  return (
    <div className="mb-3">
      <label htmlFor={controlId || name} className="form-label">{label}</label>
      <select
        name={name}
        id={controlId || name}
        className="form-select"
        value={value}
        onChange={onChange}
        {...rest}
      >
        <option value="">Seleccione una especialidad</option>
        {especialidades.map((esp) => (
          <option key={esp} value={esp}>
            {esp}
          </option>
        ))}
      </select>
    </div>
  );
}
