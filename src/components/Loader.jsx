import Lottie from "lottie-react";
import loader from "../assets/animations/loader.json";
import { useEffect, useState } from "react";

export default function Loader({ visible = true }) {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    if (visible) setShow(true);
    else {
      // Espera la transición antes de desmontar el loader
      const timeout = setTimeout(() => setShow(false), 350); // Duración igual a la transición
      return () => clearTimeout(timeout);
    }
  }, [visible]);

  return show ? (
    <div
      className={`fade-loader${visible ? " fade-in" : " fade-out"}`}
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0,128,128,0.89)", // Teal casi opaco (puedes bajar el 0.96 para más transparencia)

        position: "fixed",
        inset: 0,
        zIndex: 9999,
        transition: "opacity 0.9s",
        opacity: visible ? 1 : 0,
      }}
    >
      <Lottie animationData={loader} loop style={{ width: 400, height: 400 }} />
    </div>
  ) : null;
}
