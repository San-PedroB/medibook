import React from 'react';

function Footer() {
  return (
    <footer className="bg-primary text-white text-center py-3 mt-auto">
      <div className="container">
        <small>&copy; {new Date().getFullYear()} MediBook. Todos los derechos reservados.</small>
      </div>
    </footer>
  );
}

export default Footer;
