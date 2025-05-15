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
    console.error("❌ Error al eliminar agente desde userService:", error);
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
    console.error("❌ Error al obtener agentes desde userService:", error);
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
