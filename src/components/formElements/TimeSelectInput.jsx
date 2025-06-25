import React from "react";

export default function TimeSelectInput({
  name,
  label = "Horario",
  value = "",
  onChange = () => {},
  controlId,
  options = [],
}) {
  const timeOptions = options.length
    ? options
    : [
        "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
        "11:00 AM", "11:30 AM", "12:00 PM", "13:00 PM",
        "13:30 PM", "14:00 PM", "14:30 PM", "15:00 PM",
        "15:30 PM", "16:00 PM", "16:30 PM", "17:00 PM",
        "17:30 PM", "18:00 PM", "18:30 PM", "19:00 PM",
        "19:30 PM", "20:00 PM", "20:30 PM", "21:00 PM"
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
      >
        <option value="">Seleccione una hora</option>
        {timeOptions.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
    </div>
  );
}
