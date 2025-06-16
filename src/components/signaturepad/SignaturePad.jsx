// src/components/signaturepad/SignaturePad.jsx
import React, { useRef, useEffect, useState } from 'react';
import SignaturePad from 'signature_pad';
import './SignaturePad.css';

const SignaturePadComponent = () => {
  const canvasRef = useRef(null);
  const signaturePadRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      signaturePadRef.current = new SignaturePad(canvasRef.current);
    }
  }, []);

  const clear = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
    }
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={300}
        height={150}
        style={{ border: '1px solid #000', touchAction: 'none',
          display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
      />
     <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
      <button className="botpad hiddenbutton" onClick={clear}>Limpiar todo</button>
     </div>
    </div>
  );
};

export default SignaturePadComponent;
