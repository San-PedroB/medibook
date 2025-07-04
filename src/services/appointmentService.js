import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, addDoc, Timestamp, query, where, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";



/**
 * Trae solo las citas de la empresa actual (filtrando por companyId)
 */
export async function getAppointmentsByCompany(companyId) {
  const q = query(
    collection(db, "appointments"),
    where("companyId", "==", companyId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => {
    const data = doc.data();

    let start = data.start;
    let end = data.end;

    if (start && typeof start.toDate === "function") {
      start = start.toDate().toISOString();
    }
    if (end && typeof end.toDate === "function") {
      end = end.toDate().toISOString();
    }

    return {
      id: doc.id,
      title: `${data.patientName || "Paciente"} - ${data.doctorName || "Médico"}`,
      start,
      end,
      doctorName: data.doctorName,
      patientName: data.patientName,
      specialties: data.specialties, // <-- Array de especialidades o string
      notes: data.notes,
      status: data.status,
      extendedProps: {
        ...data,
        id: doc.id,
        start,
        end
      }
    };
  });
}


/**
 * Crea una nueva cita en Firestore
 */
export async function createAppointment({ 
  patientName,
  doctorName,
  doctorId,
  start,
  end,
  notes = "",
  status = "vigente",
  companyId
}) {
  // Si te llega fecha en string, conviértela a Timestamp de Firebase
  const startTimestamp = Timestamp.fromDate(new Date(start));
  const endTimestamp = Timestamp.fromDate(new Date(end));

  // === NUEVO: Obtener las especialidades del doctor ===
  let specialties = [];
  try {
    const doctorRef = doc(db, "doctors", doctorId);
    const doctorSnap = await getDoc(doctorRef);
    if (doctorSnap.exists()) {
      specialties = doctorSnap.data().specialties || [];
    }
  } catch (error) {
    // Si falla, deja el array vacío (o podrías loguear el error)
    specialties = [];
  }

  // === Crear el objeto de la cita con specialties ===
  const newAppointment = {
    patientName,
    doctorName,
    doctorId,
    specialties, // 👈 AGREGA AQUÍ
    start: startTimestamp,
    end: endTimestamp,
    notes,
    status,
    companyId,
  };

  const docRef = await addDoc(collection(db, "appointments"), newAppointment);
  return docRef.id;
}

/**
 * Actualiza el estado de una cita por su ID
 */
export async function updateAppointmentStatus(appointmentId, newStatus) {
  const appointmentRef = doc(db, "appointments", appointmentId);
  await updateDoc(appointmentRef, { status: newStatus });
}

/**
 * Elimina una cita por su ID
 */
export async function deleteAppointment(appointmentId) {
  const appointmentRef = doc(db, "appointments", appointmentId);
  await deleteDoc(appointmentRef);
}







