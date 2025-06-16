// src/components/formElements/SpecialtySelect.jsx
function SpecialtySelect({ value, onChange, label = "Especialidad", ...rest }) {
    const especialidades = [
      "Medicina General",
      "Especialidades Médicas Avanzadas",
      "Psicología y Bienestar Mental",
      "Atención Pediatrica",
      "Salud Femenina",
      "Salud Masculina",
      "Cuidado Dental",
      "Terapias y Rehabilitación Física",
      "Exámenes Médicos y Laboratorio",
      "Otras Especialidades"
    ];
  
    return (
      <div className="mb-3">
        <label className="form-label">{label}</label>
        <select
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
  
  export default SpecialtySelect;
  