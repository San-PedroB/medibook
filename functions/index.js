const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const corsHandler = cors({ origin: true }); // permite cualquier origen

admin.initializeApp();

const app = express();

// ✅ Permite solicitudes desde cualquier origen (ajusta si quieres más seguridad)
app.use(cors({ origin: "*" }));
app.use(express.json());

app.post("/", async (req, res) => {
  console.log("📥 Solicitud recibida:", req.body);

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("❌ Sin token de autenticación");
    return res.status(401).json({ error: "No autorizado" });
  }

  const idToken = authHeader.split("Bearer ")[1];
  let decodedToken;
  try {
    decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log("✅ Token verificado:", decodedToken.uid);
  } catch (error) {
    console.error("❌ Token inválido:", error);
    return res.status(401).json({ error: "Token inválido" });
  }

  const requesterUid = decodedToken.uid;
  const requesterSnap = await admin
    .firestore()
    .collection("users")
    .doc(requesterUid)
    .get();

  if (!requesterSnap.exists || requesterSnap.data().role !== "admin") {
    console.log("❌ Usuario no autorizado o no es admin");
    return res.status(403).json({ error: "No tienes permiso para realizar esta acción" });
  }

  const adminData = requesterSnap.data();
  const { name, lastName, secondLastName, email, password } = req.body;

  if (!name || !lastName || !secondLastName || !email || !password) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }


  try {
    // 1) Crear usuario en Auth
    const userRecord = await admin.auth().createUser({ email, password });

    // 2) Escribir doc en Firestore con companyName y adminId
    await admin
      .firestore()
      .collection("users")
      .doc(userRecord.uid)
      .set({
        name,
        lastName,
        secondLastName,
        email,
        role: "agent",
        adminId: requesterUid,
        companyId: adminData.companyId,
        companyName: adminData.companyName,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });


    console.log("✅ Agente creado:", userRecord.uid);
    return res.status(201).json({ success: true, uid: userRecord.uid });
  } catch (error) {
    console.error("❌ Error al crear usuario:", error);
    return res.status(500).json({ error: "Error al crear agente" });
  }
});


//******************************************************************* */

exports.deleteAgentUserHttp = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método no permitido" });
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const idToken = authHeader.split("Bearer ")[1];

    let decodedToken;
    try {
      decodedToken = await admin.auth().verifyIdToken(idToken);
    } catch (error) {
      console.error("❌ Token inválido:", error);
      return res.status(401).json({ error: "Token inválido" });
    }

    const requesterUid = decodedToken.uid;
    const requesterDoc = await admin.firestore().collection("users").doc(requesterUid).get();

    if (!requesterDoc.exists || requesterDoc.data().role !== "admin") {
      return res.status(403).json({ error: "No tienes permiso para esta acción" });
    }

    const { agentId } = req.body;

    if (!agentId) {
      return res.status(400).json({ error: "Falta el ID del agente" });
    }

    try {
      // 1. Eliminar de Auth
      await admin.auth().deleteUser(agentId);

      // 2. Eliminar de Firestore
      await admin.firestore().collection("users").doc(agentId).delete();

      return res.status(200).json({ success: true, message: "Agente eliminado correctamente" });
    } catch (error) {
      console.error("❌ Error al eliminar agente:", error);
      return res.status(500).json({ error: "Error al eliminar agente" });
    }
  });
});


//******************************************************************* */
exports.updateAgentPasswordHttp = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método no permitido" });
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const idToken = authHeader.split("Bearer ")[1];

    let decodedToken;
    try {
      decodedToken = await admin.auth().verifyIdToken(idToken);
    } catch (error) {
      console.error("❌ Token inválido:", error);
      return res.status(401).json({ error: "Token inválido" });
    }

    const requesterUid = decodedToken.uid;
    const requesterDoc = await admin.firestore().collection("users").doc(requesterUid).get();

    if (!requesterDoc.exists || requesterDoc.data().role !== "admin") {
      return res.status(403).json({ error: "No tienes permiso para esta acción" });
    }

    const { agentId, newPassword } = req.body;

    if (!agentId || !newPassword) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    try {
      await admin.auth().updateUser(agentId, { password: newPassword });
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("❌ Error al actualizar contraseña del agente:", error);
      return res.status(500).json({ error: "Error al actualizar la contraseña" });
    }
  });
});


// Exportar como función HTTP
exports.createAgentUserHttp = functions.https.onRequest(app);
