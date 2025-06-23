// src/services/patientService.js
import { db } from "../firebase/firebaseConfig";
import { collection, query, where, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { validateFields } from "../utils/formUtils";

/**
 * Crea un nuevo paciente en Firestore, validando campos obligatorios.
 */
// src/services/patientService.js
export async function createPatient({
  firstName, lastName, rut, phone, email,
  birthDate, previsionType, nationality,
  address, gender, companyId, createdBy
}) {
  const data = {
    firstName, lastName, rut, phone, email,
    birthDate, previsionType, nationality,
    address, gender, companyId, createdBy,
    createdAt: Timestamp.now()
  };
  const docRef = await addDoc(collection(db, "patients"), data);
  return { id: docRef.id, ...data };
}


/**
 * Obtiene la lista de pacientes filtrados por companyId.
 */
export async function getPatientsByCompany(companyId) {
  const q = query(
    collection(db, "patients"),
    where("companyId", "==", companyId)
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}


