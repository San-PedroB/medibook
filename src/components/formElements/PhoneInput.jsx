// src/components/formElements/PhoneInput.jsx
function PhoneInput({ value, onChange, label = "Teléfono", ...rest }) {
    const handleInput = (e) => {
      let input = e.target.value;
  
      // Quitar caracteres no numéricos o ceros
      input = input.replace(/[^1-9]/g, "");
  
      // Limitar a 8 caracteres
      if (input.length > 8) {
        input = input.slice(0, 8);
      }
  
      // Actualizar el valor
      onChange({ target: { value: input } });
    };
  
    return (
      <div className="mb-3">
        <label className="form-label">{label}</label>
        <input
          type="text"
          inputMode="numeric"
          className="form-control"
          value={value}
          onChange={handleInput}
          placeholder="Ej: 12345678"
          {...rest}
        />
      </div>
    );
  }
  
  export default PhoneInput;
  