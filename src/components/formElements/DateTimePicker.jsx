import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";

export default function DateTimePicker({
  label = "",
  value,
  onChange,
  required = false,
  placeholder = "Selecciona fecha",
  minDate,
  maxDate,
  showTime = true,
  showYearDropdown = false,         // 👈 Nuevo, default false
  scrollableYearDropdown = false,   // 👈 Nuevo, default false
}) {
  return (
    <div className="mb-2">
      {label && <label>{label}</label>}
      <ReactDatePicker
        selected={value}
        onChange={onChange}
        showTimeSelect={showTime}
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat={showTime ? "Pp" : "P"}
        locale={es}
        className="form-control"
        placeholderText={placeholder}
        required={required}
        minDate={minDate}
        maxDate={maxDate}
        showYearDropdown={showYearDropdown}
        scrollableYearDropdown={scrollableYearDropdown}
      />
    </div>
  );
}
