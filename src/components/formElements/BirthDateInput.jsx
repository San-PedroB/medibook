// src/components/formElements/BirthDateInput.jsx

import React from "react";

function BirthDateInput({ label = "Fecha de nacimiento", value, onChange, name = "birthDate" }) {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input
        type="date"
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
      />
    </div>
  );
}

export default BirthDateInput;