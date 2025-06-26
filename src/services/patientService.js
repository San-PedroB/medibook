// src/services/patientService.js
import { db } from "../firebase/firebaseConfig";
import { collection, query, where, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { validateFields } from "../utils/formUtils";
import { doc, updateDoc, deleteDoc, getDoc, orderBy   } from "firebase/firestore";

/**
 * Crea un nuevo paciente en Firestore, validando campos obligatorios.
 */
// src/services/patientService.js
export async function createPatient({
  firstName,
  lastNameP,
  lastNameM,
  rut,
  phone,
  email,
  birthDate,
  previsionType,
  nationality,
  address,
  gender,
  companyId,
  createdBy
}) {
  const data = {
    firstName,
    lastNameP,
    lastNameM,
    rut,
    phone,
    email,
    birthDate,
    previsionType,
    nationality,
    address,
    gender,
    companyId,
    createdBy,
    createdAt: Timestamp.now()
  };

  const requiredFields = [
    "firstName",
    "lastNameP",
    "lastNameM",
    "rut",
    "phone",
    "email",
    "birthDate",
    "previsionType",
    "nationality",
    "address",
    "gender",
    "companyId",
    "createdBy"
  ];

  // 🚩 Corregido: genera un array de valores de los campos requeridos
  const values = requiredFields.map(key => data[key]);

  if (!validateFields(values)) {
    throw new Error("Complete correctamente todos los campos.");
  }

  const docRef = await addDoc(collection(db, "patients"), data);
  return { id: docRef.id, ...data };
}


/**
 * Obtiene la lista de pacientes filtrados por companyId.
 */
export async function getPatientsByCompany(companyId) {
  const q = query(
    collection(db, "patients"),
    where("companyId", "==", companyId),
    orderBy("lastNameP", "asc"),
    orderBy("lastNameM", "asc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}



/**
 * Obtiene un paciente por su ID.
 * @param {string} patientId - ID del paciente.
 * @returns {Promise<Object>} Datos del paciente con su ID.
 * @throws Error si no se proporciona ID o paciente no existe.
 */
export async function getPatientById(patientId) {
  if (!patientId) throw new Error("No se proporcionó el ID del paciente.");

  const patientRef = doc(db, "patients", patientId);
  const snap = await getDoc(patientRef);

  if (!snap.exists()) throw new Error("Paciente no encontrado.");

  return { id: snap.id, ...snap.data() };
}

/**
 * Actualiza un paciente existente en Firestore, validando campos obligatorios.
 */
export async function updatePatient(patientId, fields) {
  // Lista de campos obligatorios para edición
  const requiredFields = [
    "firstName",
    "lastNameP",
    "lastNameM",
    "rut",
    "phone",
    "email",
    "birthDate",
    "previsionType",
    "nationality",
    "address",
    "gender"
    // companyId y createdBy normalmente NO se actualizan en update
  ];

  // 🚩 Genera un array de valores de los campos requeridos
  const values = requiredFields.map(key => fields[key]);

  if (!validateFields(values)) {
    throw new Error("Complete correctamente todos los campos.");
  }

  const patientRef = doc(db, "patients", patientId);

  // Agrega opcionalmente updatedAt
  await updateDoc(patientRef, {
    ...fields,
    updatedAt: new Date()
  });
}

/**
 * Elimina un paciente por su ID.
 * @param {string} patientId - ID del paciente a eliminar.
 * @returns {Promise<void>}
 */
export async function deletePatient(patientId) {
  if (!patientId) {
    throw new Error("No se proporcionó el ID del paciente.");
  }
  const patientRef = doc(db, "patients", patientId);
  await deleteDoc(patientRef);
}

// src/services/patientService.js



