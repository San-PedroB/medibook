// /views/Doctors/CreateDoctor.jsx
import CreateDoctorForm from "../../components/doctor/CreateDoctorForm";

function CreateDoctor() {
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Registrar Médico</h2>
        <CreateDoctorForm />
      </div>
    </div>
  );
}

export default CreateDoctor;
