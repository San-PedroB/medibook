

// === src/services/doctorService.js ===
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  Timestamp
} from "firebase/firestore";

import { validateFields } from "../utils/formUtils";


/**
 * 🆕 Crear un nuevo médico en Firestore con campos de nombre separados
 */
export async function createDoctor({
  firstName,
  paternalLastName,
  maternalLastName,
  rut,
  email,
  specialties,
  companyId
}) {
  const fullName = `${firstName} ${paternalLastName} ${maternalLastName}`;
  const newDoctor = {
    firstName,
    paternalLastName,
    maternalLastName,
    fullName,
    rut,
    email,
    specialties,
    companyId,
    createdAt: Timestamp.now()
  };

  // 1. Define los campos obligatorios
  const requiredFields = [
    "firstName",
    "paternalLastName",
    "maternalLastName",
    "rut",
    "email",
    "specialties",
    "companyId"
  ];

  // 2. Genera el array de valores de los campos requeridos
  const values = requiredFields.map(key => newDoctor[key]);

  // 3. Valida antes de guardar
  if (!validateFields(values)) {
    throw new Error("Complete correctamente todos los campos obligatorios.");
  }

  const docRef = await addDoc(collection(db, "doctors"), newDoctor);
  return { id: docRef.id, ...newDoctor };
}


/**
 * 📋 Obtener todos los médicos de una empresa,
 *    ordenados por apellido paterno ascendente
 */
export async function getDoctorsByCompanyId(companyId) {
  const q = query(
    collection(db, "doctors"),
    where("companyId", "==", companyId),
    orderBy("paternalLastName", "asc"),
    orderBy("maternalLastName", "asc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
}


/**
 * 📄 Obtener un único médico por su ID
 */
export async function getDoctorById(doctorId) {
  const docRef = doc(db, "doctors", doctorId);
  const snap = await getDoc(docRef);
  if (!snap.exists()) throw new Error("Médico no encontrado");
  return { id: snap.id, ...snap.data() };
}

/**
 * Actualiza un doctor existente en Firestore, validando campos obligatorios.
 * @param {string} doctorId - ID del doctor a actualizar.
 * @param {object} fields - Campos a actualizar (debe incluir los obligatorios).
 * @returns {Promise<void>}
 */
export async function updateDoctor(doctorId, fields) {
  // Lista de campos obligatorios para edición
  const requiredFields = [
    "firstName",
    "paternalLastName",
    "maternalLastName",
    "rut",
    "email",
    "specialties",
    "companyId"
    // ...agrega aquí cualquier otro obligatorio (pero NO campos opcionales)
  ];

  // 🚩 Genera un array de valores de los campos requeridos
  const values = requiredFields.map(key => fields[key]);

  if (!validateFields(values)) {
    throw new Error("Complete correctamente todos los campos obligatorios.");
  }

  const doctorRef = doc(db, "doctors", doctorId);

  await updateDoc(doctorRef, {
    ...fields,
    updatedAt: Timestamp.now()

  });
}

/**
 * ❌ Eliminar un médico por su ID
 */
export async function deleteDoctor(doctorId) {
  const doctorRef = doc(db, "doctors", doctorId);
  await deleteDoc(doctorRef);
}
