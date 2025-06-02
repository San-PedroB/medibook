import EditDoctorDetails from "../components/doctor/EditDoctorDetails";
import { useParams } from "react-router-dom";

function EditDoctor() {
  const { id } = useParams();

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Editar Médico</h2>
      <EditDoctorDetails doctorId={id} />
    </div>
  );
}

export default EditDoctor;
