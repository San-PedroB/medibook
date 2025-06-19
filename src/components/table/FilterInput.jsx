// src/components/table/FilterInput.jsx
import React from "react";

function FilterInput({ placeholder, column }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="form-control mb-3"
      value={column.getFilterValue() ?? ""}
      onChange={(e) => column.setFilterValue(e.target.value)}
    />
  );
}

export default FilterInput;
