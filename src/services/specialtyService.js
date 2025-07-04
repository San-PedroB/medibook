import { db } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  Timestamp,
  updateDoc
} from "firebase/firestore";

// ✅ Exportar funciones nombradas
export async function addSpecialty({ name, companyId }) {
  const trimmed = name.trim();
  if (!trimmed) throw new Error("El nombre no puede estar vacío");

  const q = query(
    collection(db, "specialties"),
    where("companyId", "==", companyId),
    where("name", "==", trimmed)
  );
  const snapshot = await getDocs(q);
  if (!snapshot.empty) throw new Error("Ya existe una especialidad con ese nombre");

  await addDoc(collection(db, "specialties"), {
    name: trimmed,
    companyId,
    createdAt: Timestamp.now(),
  });
}

export async function getSpecialtiesByCompany(companyId) {
  const q = query(collection(db, "specialties"), where("companyId", "==", companyId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function deleteSpecialty(id) {
  await deleteDoc(doc(db, "specialties", id));
}

export async function updateSpecialty(specialtyId, newName) {
  const trimmed = newName.trim();
  if (!trimmed) throw new Error("El nombre no puede estar vacío");

  const specialtyRef = doc(db, "specialties", specialtyId);
  await updateDoc(specialtyRef, {
    name: trimmed,
    updatedAt: Timestamp.now(),
  });
}
