
// functions/src/index.js
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

// Inicializa Firebase Admin
admin.initializeApp();

// Configuración de Express
const app = express();
app.use(cors({ origin: true })); // Ajusta origen si es necesario
app.use(express.json());

/**
 * Ruta: POST /
 * Descripción: Crea un nuevo agente. Requiere token Bearer con rol 'admin'.
 */
app.post("/", async (req, res) => {
  console.log("📥 Solicitud recibida:", req.body);

  // Verificación de token
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No autorizado" });
  }
  const idToken = authHeader.split("Bearer ")[1];

  let decoded;
  try {
    decoded = await admin.auth().verifyIdToken(idToken);
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }

  // Verificar rol admin
  const requesterSnap = await admin.firestore().collection("users").doc(decoded.uid).get();
  if (!requesterSnap.exists || requesterSnap.data().role !== "admin") {
    return res.status(403).json({ error: "No tienes permiso" });
  }

  // Desestructurar y validar campos
  const { firstName, lastName, secondLastName, rut, email, password } = req.body;
  if (!firstName || !lastName || !secondLastName || !rut || !email || !password) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }


  try {
    // Crear usuario en Auth con displayName
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: `${firstName} ${lastName} ${secondLastName}`
    });

    // Guardar en Firestore
    await admin.firestore().collection("users").doc(userRecord.uid).set({
      firstName,
      lastName,
      secondLastName,
      email,
      rut,
      role: "agent",
      adminId: decoded.uid,
      companyId: requesterSnap.data().companyId,
      companyName: requesterSnap.data().companyName,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return res.status(201).json({ success: true, uid: userRecord.uid });
  } catch (error) {
    console.error("Error al crear agente:", error);
    return res.status(500).json({ error: error.message || "Error al crear agente" });
  }
});

/**
 * Ruta: POST /delete
 * Descripción: Elimina un agente por ID.
 */
app.post("/delete", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No autorizado" });
  }
  const idToken = authHeader.split("Bearer ")[1];

  let decoded;
  try {
    decoded = await admin.auth().verifyIdToken(idToken);
  } catch {
    return res.status(401).json({ error: "Token inválido" });
  }

  const requesterSnap = await admin.firestore().collection("users").doc(decoded.uid).get();
  if (!requesterSnap.exists || requesterSnap.data().role !== "admin") {
    return res.status(403).json({ error: "No tienes permiso" });
  }

  const { agentId } = req.body;
  if (!agentId) {
    return res.status(400).json({ error: "Falta el ID del agente" });
  }

  try {
    await admin.auth().deleteUser(agentId);
    await admin.firestore().collection("users").doc(agentId).delete();
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error al eliminar agente:", error);
    return res.status(500).json({ error: error.message || "Error al eliminar agente" });
  }
});

/**
 * Ruta: POST /update-password
 * Descripción: Actualiza la contraseña de un agente.
 */
app.post("/update-password", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No autorizado" });
  }
  const idToken = authHeader.split("Bearer ")[1];

  let decoded;
  try {
    decoded = await admin.auth().verifyIdToken(idToken);
  } catch {
    return res.status(401).json({ error: "Token inválido" });
  }

  const requesterSnap = await admin.firestore().collection("users").doc(decoded.uid).get();
  if (!requesterSnap.exists || requesterSnap.data().role !== "admin") {
    return res.status(403).json({ error: "No tienes permiso" });
  }

  const { agentId, newPassword } = req.body;
  if (!agentId || !newPassword) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  try {
    await admin.auth().updateUser(agentId, { password: newPassword });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error al actualizar contraseña:", error);
    return res.status(500).json({ error: error.message || "Error al actualizar contraseña" });
  }
});

// Exporta la app de Express como función HTTPS
exports.createAgentUserHttp = functions.https.onRequest(app);

