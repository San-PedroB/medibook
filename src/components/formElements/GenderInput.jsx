// src/components/formElements/GenderInput.jsx

import React from "react";

function GenderInput({ label = "Género", value, onChange, name = "gender" }) {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <select
        className="form-select"
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value="">Selecciona una opción</option>
        <option value="masculino">Masculino</option>
        <option value="femenino">Femenino</option>
        <option value="otro">Otro</option>
      </select>
    </div>
  );
}

export default GenderInput;