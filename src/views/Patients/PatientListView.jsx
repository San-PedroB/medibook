// src/views/patients/PatientListView.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getPatientsByCompany } from "../../services/patientService";
import DataTable from "../../components/table/DataTable";

export default function PatientListView() {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const data = await getPatientsByCompany(user.companyId);
      setPatients(data);
    })();
  }, [user]);

  const columns = [
    {
      header: "Nombre completo",
      accessorFn: row => `${row.firstName} ${row.lastName}`,
    },
    { header: "RUT", accessorKey: "rut" },
    { header: "Teléfono", accessorKey: "phone" },
    { header: "Email", accessorKey: "email" },
    {
      header: "Fecha nacimiento",
      accessorFn: row => new Date(row.birthDate).toLocaleDateString(),
    },
  ];

  return (
    <div className="container mt-4">
      <h2>Lista de pacientes</h2>
      <DataTable data={patients} columns={columns} />
    </div>
  );
}
