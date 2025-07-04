// src/components/formElements/FieldError.jsx
import React from "react";
import PropTypes from "prop-types";

function FieldError({ message, forwardedRef, className = "", style = {} }) {
  if (!message) return null;

  return (
    <div
      ref={forwardedRef}
      className={`invalid-feedback d-block animate__animated animate__headShake ${className}`}
      style={style}
      role="alert"
    >
      {message}
    </div>
  );
}

FieldError.propTypes = {
  message: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  className: PropTypes.string,
  style: PropTypes.object,
};

export default FieldError;
