// /src/services/doctorService.js

import { db } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  serverTimestamp
} from "firebase/firestore";

// 🆕 Crear médico
export async function createDoctor({ name, email, specialties, companyId }) {
  const newDoctor = {
    name,
    email,
    specialties,
    companyId,
    createdAt: serverTimestamp()
  };

  const docRef = await addDoc(collection(db, "doctors"), newDoctor);
  return { id: docRef.id, ...newDoctor };
}

// 📋 Obtener médicos por empresa
export async function getDoctorsByCompanyId(companyId) {
  const q = query(
    collection(db, "doctors"),
    where("companyId", "==", companyId)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

// ✏️ Actualizar médico
export async function updateDoctor(doctorId, updatedFields) {
  const doctorRef = doc(db, "doctors", doctorId);
  await updateDoc(doctorRef, updatedFields);
}

// ❌ Eliminar médico
export async function deleteDoctor(doctorId) {
  await deleteDoc(doc(db, "doctors", doctorId));
}
