
// functions/index.js
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
// functions/src/index.js
app.post("/", async (req, res) => {
  // 1. Loguea todo lo que llega
  console.log("📥 [Server] req.body:", req.body);

  // 2. Verificación de token (igual que antes)
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

  // 3. Verificar rol admin (igual que antes)
  const requesterSnap = await admin.firestore().collection("users").doc(decoded.uid).get();
  console.log("📥 [Server] Datos del admin (requesterSnap):", requesterSnap.data());
  if (!requesterSnap.exists || requesterSnap.data().role !== "admin") {
    return res.status(403).json({ error: "No tienes permiso" });
  }

  // 4. Desestructurar
  const { firstName, lastName, secondLastName, rut, email, password } = req.body;

  // 5. Validación detallada de campos obligatorios
  const required = ["firstName","lastName","secondLastName","rut","email","password"];
  for (const field of required) {
    if (typeof req.body[field] === "undefined") {
      console.warn(`⚠️ Falta campo ${field}`);
      return res.status(400).json({ error: `Campo obligatorio "${field}" no provisto` });
    }
  }
  // (Opcional) Si además quieres impedir strings vacíos:
  if ([firstName, lastName, secondLastName, rut, email, password].some(v => v === "")) {
    return res.status(400).json({ error: "Algún campo obligatorio está vacío" });
  }

  try {
    // 6. Crear usuario en Auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: `${firstName} ${lastName} ${secondLastName}`
    });

    
    // 7. Construir userData y eliminar undefined sueltos 
    const userData = {
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
    };
    Object.keys(userData).forEach(key => {
      if (userData[key] === undefined) {
        console.warn(`⚠️ Eliminando campo undefined: ${key}`);
        delete userData[key];
      }
    });

    // 8. Guardar en Firestore
    await admin.firestore().collection("users").doc(userRecord.uid).set(userData);

    return res.status(201).json({ success: true, uid: userRecord.uid });
  } catch (error) {
    console.error("Error al crear agente:", error);
    return res.status(500).json({ error: error.message || "Error al crear agente" });
  }
});


/**
 * Ruta: POST /update
 * Descripción: Actualiza datos de un agente (nombre, apellidos, rut y email).
 */
app.post("/update", async (req, res) => {
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

  // Sólo admin puede
  const requesterSnap = await admin.firestore().collection("users").doc(decoded.uid).get();
  if (!requesterSnap.exists || requesterSnap.data().role !== "admin") {
    return res.status(403).json({ error: "No tienes permiso" });
  }

  // Campos que esperamos
  const { agentId, firstName, lastName, secondLastName, rut, email } = req.body;
  if (!agentId || !firstName || !lastName || !email) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    // 1) Actualizar email en Auth si cambió
    await admin.auth().updateUser(agentId, { email });

    // 2) Actualizar datos en Firestore
    await admin
      .firestore()
      .collection("users")
      .doc(agentId)
      .update({ firstName, lastName, secondLastName, rut, email });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error actualizando agente:", error);
    return res.status(500).json({ error: error.message || "Error interno" });
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

