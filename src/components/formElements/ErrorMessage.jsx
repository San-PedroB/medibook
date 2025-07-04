function ErrorMessage({ message, forwardedRef }) {
    if (!message) return null;
  
    return (
      <div
        ref={forwardedRef}
        className="alert alert-danger mt-2 d-flex justify-content-center align-items-center text-center animate__animated animate__headShake"
        role="alert"
        style={{ minHeight: '45px' }}
      >
        {message}
      </div>
    );
  }
  
  export default ErrorMessage;
  