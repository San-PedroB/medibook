
// src/services/userService.js
import { auth, db } from "../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  query,
  collection,
  where,
  orderBy,
  getDocs,
  updateDoc
} from "firebase/firestore";

/**
 * Crea un usuario en Firebase Auth y retorna el uid
 */
async function createAuthUser(email, password) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user.uid;
}

/**
 * Crea un documento de empresa y retorna el companyId
 */
async function createCompany({
  name,
  businessName,
  rutCompany,
  industry,
  phoneCompany,
  street,
  number,
  office = "",
  city,
  website = ""
}, uid) {
  const companyId = `company-${uid}`;
  await setDoc(doc(db, "companies", companyId), {
    name,
    businessName,
    rut: rutCompany,
    industry,
    phone: phoneCompany,
    address: { street, number, office, city },
    website,
    createdAt: serverTimestamp()
  });
  return companyId;
}

/**
 * Crea un documento de admin en la subcolección de la empresa
 */
async function createCompanyAdmin({ firstName, lastNameP, lastNameM, rutAdmin, phoneAdmin }, companyId, uid) {
  await setDoc(doc(db, "companies", companyId, "admins", uid), {
    firstName,
    lastNameP,
    lastNameM,
    rut: rutAdmin,
    phone: phoneAdmin,
    companyId,
    createdAt: serverTimestamp()
  });
}

/**
 * Crea perfil de usuario en "users" para metadata de la cuenta
 */
async function createUserProfile(uid, { email, acceptTerms }, companyId, companyName) {
  await setDoc(doc(db, "users", uid), {
    email,
    role: "admin",
    acceptTerms,
    companyId,
    companyName,
    createdAt: serverTimestamp()
  });
}

/**
 * Registra un nuevo administrador y su empresa utilizando pasos separados:
 * 1. Crear usuario en Auth.
 * 2. Crear documento de empresa.
 * 3. Crear documento de admin en subcolección.
 * 4. Crear perfil de usuario en "users".
 */
export async function registerAdminWithCompany({ admin, company, account }) {
  const { firstName, lastNameP, lastNameM, rutAdmin, phoneAdmin } = admin;
  const { name, businessName, rutCompany, industry, phoneCompany, street, number, office, city, website } = company;
  const { email, password, acceptTerms } = account;

  // 1. Auth
  const uid = await createAuthUser(email, password);

  // 2. Empresa
  const companyId = await createCompany(
    { name, businessName, rutCompany, industry, phoneCompany, street, number, office, city, website },
    uid
  );

  // 3. Admin
  await createCompanyAdmin(
    { firstName, lastNameP, lastNameM, rutAdmin, phoneAdmin },
    companyId,
    uid
  );

  // 4. Perfil de usuario
  await createUserProfile(uid, { email, acceptTerms }, companyId, name);

  return { uid, companyId };
}

/**
 * Registra un nuevo agente usando Cloud Function protegida
 */
export async function registerAgent({ firstName, lastName, secondLastName, rut, email, password }) {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error("No hay usuario autenticado.");

  const token = await currentUser.getIdToken(true);
  const response = await fetch(
    "https://us-central1-medibook-60739.cloudfunctions.net/createAgentUserHttp",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ firstName, lastName, secondLastName, rut, email, password })
    }
  );
  const result = await response.json();
  if (!response.ok) {
    console.error("❌ Error desde el backend:", result);
    throw new Error("Error al crear agente");
  }
  return result;
}

/**
 * Login de usuario (admin o agente)
 */
export async function loginUser({ email, password }) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

/**
 * Obtiene datos del usuario actual desde Firestore
 */
export async function getCurrentUserData() {
  const user = auth.currentUser;
  if (!user) return null;
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) return null;
  return { uid: user.uid, ...userSnap.data() };
}

/**
 * Logout
 */
export async function logoutUser() {
  await signOut(auth);
}

/**
 * Elimina un agente usando Cloud Function protegida
 */
export async function deleteAgentById(agentId) {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error("No hay usuario autenticado");
  const token = await currentUser.getIdToken(true);
  const response = await fetch(
    "https://us-central1-medibook-60739.cloudfunctions.net/deleteAgentUserHttp",
    {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ agentId })
    }
  );
  const result = await response.json();
  if (!response.ok) {
    console.error("❌ Error desde el backend:", result.error);
    throw new Error(result.error || "Error al eliminar agente");
  }
  return result;
}

/**
 * Obtiene agentes por companyId
 */
export async function getAgentsByCompanyId(companyId) {
  const q = query(
    collection(db, "users"),
    where("role", "==", "agent"),
    where("companyId", "==", companyId),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

/**
 * Actualiza campos de un agente
 */
export async function updateAgentById(agentId, updatedFields) {
  const agentRef = doc(db, "users", agentId);
  await updateDoc(agentRef, updatedFields);
}

/**
 * Actualiza contraseña de agente via Cloud Function
 */
export async function updateAgentPassword({ agentId, newPassword, token }) {
  const response = await fetch(
    "https://us-central1-medibook-60739.cloudfunctions.net/updateAgentPasswordHttp",
    {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ agentId, newPassword })
    }
  );
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Error al actualizar la contraseña");
  return result;
}