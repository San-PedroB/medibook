// /views/Doctors/EditDoctor.jsx
import { useParams } from "react-router-dom";
import EditDoctorForm from "../../components/doctor/EditDoctorForm";

function EditDoctor() {
  const { id } = useParams();

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Editar Médico</h2>
      <EditDoctorForm doctorId={id} />
    </div>
  );
}

export default EditDoctor;
