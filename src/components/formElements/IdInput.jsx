
import React from "react";

function IdInput({ value, onChange, label = "RUT", ...rest }) {
  const formatRut = (rut) => {
    // Eliminar todo lo que no sea número o K/k
    rut = rut.replace(/[^0-9kK]/g, "");

    // Separar dígito verificador
    let cuerpo = rut.slice(0, -1);
    let dv = rut.slice(-1).toUpperCase();

    // Aplicar formato con puntos
    cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return `${cuerpo}-${dv}`;
  };

  const handleInput = (e) => {
    let input = e.target.value;

    // Limpiar caracteres no válidos
    input = input.replace(/[^0-9kK]/g, "");

    // Limitar largo a 9 caracteres
    if (input.length > 9) {
      input = input.slice(0, 9);
    }

    // Formatear y actualizar
    const formatted = formatRut(input);
    onChange({ target: { value: formatted } });
  };

  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={handleInput}
        placeholder="Ej: 13.345.864-0"
        {...rest}
      />
    </div>
  );
}


export default IdInput;