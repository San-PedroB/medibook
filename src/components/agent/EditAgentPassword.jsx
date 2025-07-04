import { useState, useRef } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { updateAgentPassword } from "../../services/userService";
import ErrorMessage from "../formElements/ErrorMessage";
import SubmitButton from "../formElements/SubmitButton";
import { triggerAnimation } from "../../utils/animationUtils";

function EditAgentPassword({ agentId }) {
  const [adminPassword, setAdminPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const errorRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!adminPassword || !newPassword || !confirmPassword) {
      setErrorMessage("Complete todos los campos.");
      triggerAnimation(errorRef, "animate__headShake");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      triggerAnimation(errorRef, "animate__headShake");
      return;
    }

    setIsSubmitting(true);

    try {
      const currentUser = auth.currentUser;
      await signInWithEmailAndPassword(auth, currentUser.email, adminPassword);
      const token = await currentUser.getIdToken(true);

      await updateAgentPassword({ agentId, newPassword, token });

      setSuccessMessage("Contraseña actualizada correctamente.");
      setAdminPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("❌ Error al actualizar contraseña:", error);
      setErrorMessage("No se pudo actualizar la contraseña.");
      triggerAnimation(errorRef, "animate__headShake");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card p-4 mx-auto mt-4" style={{ maxWidth: "400px" }}>
      <h5 className="text-center mb-3">Cambiar Contraseña del Agente</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tu contraseña (admin)</label>
          <input
            type="password"
            className="form-control"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nueva contraseña del agente</label>
          <input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Confirmar nueva contraseña</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {errorMessage && <ErrorMessage message={errorMessage} forwardedRef={errorRef} />}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        <SubmitButton text="Actualizar Contraseña" isSubmitting={isSubmitting} />
      </form>
    </div>
  );
}

export default EditAgentPassword;
