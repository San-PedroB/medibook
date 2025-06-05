import { auth, db } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { setDoc, getDoc, doc, serverTimestamp, deleteDoc, query, collection, where, orderBy, getDocs, updateDoc } from "firebase/firestore";


// Crea un nuevo agente usando una Cloud Function protegida
export async function registerAgent({ fullName, email, password }) {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("No hay usuario autenticado.");
  }

  const token = await currentUser.getIdToken(true);

  const response = await fetch("https://us-central1-medibook-60739.cloudfunctions.net/createAgentUserHttp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ fullName, email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("❌ Error desde el backend:", errorData);
    throw new Error("Error al crear agente");
  }

  const data = await response.json();
  return data;
}


// Registro del administrador
export async function registerAdmin({ fullName, email, password, companyName }) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    name: fullName,
    email,
    companyName,
    role: "admin",
    createdAt: serverTimestamp(),
    companyId: `company-${user.uid}`
  });

  return user;
}

// 👤 Login
export async function loginUser({ email, password }) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

/**
 * Elimina un agente por su ID (uid de Firebase Auth)
 */
export async function deleteAgentById(agentId) {
  try {
    await deleteDoc(doc(db, "users", agentId));
    return { success: true };
  } catch (error) {
    console.error("❌ Error al eliminar agente desde firebaseService:", error);
    throw error;
  }
}

export async function getAgentsByCompanyId(companyId) {
  try {
    const q = query(
      collection(db, "users"),
      where("role", "==", "agent"),
      where("companyId", "==", companyId),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("❌ Error al obtener agentes desde firebaseService:", error);
    throw error;
  }
}

/**
 * Modifica un agente por su ID 
 */
export async function updateAgentById(agentId, updatedFields) {
  const agentRef = doc(db, "users", agentId);
  await updateDoc(agentRef, updatedFields);
}

/**
 * Modifica contraseña de agente 
 */
export async function updateAgentPassword({ agentId, newPassword, token }) {
  const response = await fetch("https://us-central1-medibook-60739.cloudfunctions.net/updateAgentPasswordHttp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ agentId, newPassword }),
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Error al actualizar la contraseña");
  return result;
}



// 🔍 Obtener datos del usuario actual
export async function getCurrentUserData() {
  const user = auth.currentUser;
  if (!user) return null;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? userSnap.data() : null;
}

// 🔓 Logout
export async function logoutUser() {
  await signOut(auth);
}

/**
 * Registrar médico (sin autenticación)
 */
export async function registerDoctor({ fullName, email, specialty, phone }) {
  try {
    const doctorRef = doc(collection(db, "doctors")); // Genera ID automático
    await setDoc(doctorRef, {
      name: fullName,
      email,
      specialty,
      phone,
      createdAt: serverTimestamp(),
    });

    return { id: doctorRef.id };
  } catch (error) {
    console.error("❌ Error al registrar médico:", error);
    throw error;
  }
}

/**
 * Obtener todos los médicos
 */
export async function getDoctors() {
  try {
    const snapshot = await getDocs(query(collection(db, "doctors"), orderBy("createdAt", "desc")));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("❌ Error al obtener doctores:", error);
    throw error;
  }
}

/**
 * Eliminar médico por ID
 */
export async function deleteDoctorById(doctorId) {
  try {
    await deleteDoc(doc(db, "doctors", doctorId));
  } catch (error) {
    console.error("❌ Error al eliminar médico:", error);
    throw error;
  }
}

/**
 * Actualizar médico por ID
 */
export async function updateDoctorById(doctorId, updatedFields) {
  try {
    await updateDoc(doc(db, "doctors", doctorId), updatedFields);
  } catch (error) {
    console.error("❌ Error al actualizar médico:", error);
    throw error;
  }
}


export async function getDoctorById(id) {
  const docRef = doc(db, "doctors", id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) throw new Error("Médico no encontrado");
  return { id: docSnap.id, ...docSnap.data() };
}

// Registro del paciente (usuario normal)
export async function registerPatient({ fullName, email, password, phone, birthDate, gender }) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    name: fullName,
    email,
    phone: phone || "",
    birthDate: birthDate || "", // Formato: "YYYY-MM-DD"
    gender: gender || "", // Ej: "male", "female", "other"
    role: "patient",
    createdAt: serverTimestamp(),
  });

  return user;
}

