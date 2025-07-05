import React, { useState } from "react";

export default function AutocompleteInput({
  options = [],
  getOptionLabel = (opt) => opt.label || "",
  value = null,
  setValue,
  placeholder = "",
  inputClassName = "form-control",
  listClassName = "list-group",
  itemClassName = "list-group-item list-group-item-action",
  disabled = false,
  required = false,
  minSearchLength = 1,      
  maxResults = 15,
}) {
  const [query, setQuery] = useState("");
  const [showList, setShowList] = useState(false);

  const filtered =
    query.length < minSearchLength
      ? []
      : options
          .filter((opt) =>
            getOptionLabel(opt).toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, maxResults);

  const handleSelect = (opt) => {
    setValue(opt);
    setQuery(getOptionLabel(opt));
    setShowList(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        className={inputClassName}
        placeholder={placeholder}
        value={value ? getOptionLabel(value) : query}
        onChange={(e) => {
          setQuery(e.target.value);
          setValue(null);
          setShowList(true);
        }}
        onFocus={() => setShowList(true)}
        onBlur={() => setTimeout(() => setShowList(false), 100)}
        disabled={disabled}
        required={required}
        autoComplete="off"
      />
      {showList && query.length >= minSearchLength && (
        <ul
          className={listClassName}
          style={{
            position: "absolute",
            zIndex: 1000,
            width: "100%",
            maxHeight: "160px",
            overflowY: "auto",
          }}
        >
          {filtered.length === 0 && (
            <li className={itemClassName} style={{ cursor: "not-allowed" }}>
              Sin resultados
            </li>
          )}
          {filtered.map((opt) => (
            <li
              key={opt.id || getOptionLabel(opt)}
              className={itemClassName}
              style={{ cursor: "pointer" }}
              onMouseDown={() => handleSelect(opt)}
            >
              {getOptionLabel(opt)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
