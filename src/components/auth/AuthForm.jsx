// src/components/AuthForm.jsx

import ErrorMessage from "../formElements/ErrorMessage";
import SubmitButton from "../formElements/SubmitButton";

function AuthForm({
  onSubmit,
  fields,
  errorMessage,
  successMessage,
  isSubmitting,
  submitText,
  errorRef,
  footer
}) {
  return (
    <form onSubmit={onSubmit}>
      {fields.map((field, index) => (
        <div key={index}>{field}</div>
      ))}

      {errorMessage && <ErrorMessage message={errorMessage} forwardedRef={errorRef} />}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <div className="d-grid mt-3">
        <SubmitButton isSubmitting={isSubmitting} text={submitText} />
      </div>
      {footer && <div className="text-center mt-3">{footer}</div>}
    </form>
  );
}

export default AuthForm;
