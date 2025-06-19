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
  serverTimestamp
} from "firebase/firestore";

/**
 * 🆕 Crear un nuevo médico en Firestore con campos de nombre separados
 */
export async function createDoctor({
  firstName,
  paternalLastName,
  maternalLastName,
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
    email,
    specialties,
    companyId,
    createdAt: serverTimestamp()
  };

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
 * ✏️ Actualizar campos de un médico existente
 */
export async function updateDoctor(doctorId, updatedFields) {
  const doctorRef = doc(db, "doctors", doctorId);
  const payload = {
    ...updatedFields,
    fullName: `${updatedFields.firstName} ${updatedFields.paternalLastName} ${updatedFields.maternalLastName}`,
    updatedAt: serverTimestamp()
  };
  await updateDoc(doctorRef, payload);
}

/**
 * ❌ Eliminar un médico por su ID
 */
export async function deleteDoctor(doctorId) {
  const doctorRef = doc(db, "doctors", doctorId);
  await deleteDoc(doctorRef);
}
