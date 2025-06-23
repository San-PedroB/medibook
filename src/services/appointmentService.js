import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export async function getAllAppointments() {
  try {
    const snapshot = await getDocs(collection(db, "appointments"));
    return snapshot.docs.map((doc) => {
      const data = doc.data();

      // Convertir Timestamp (si es necesario)
      const start = data.start?.toDate ? data.start.toDate().toISOString() : data.start;
      const end = data.end?.toDate ? data.end.toDate().toISOString() : data.end;

      return {
        id: doc.id,
        title: `Cita`, // Puedes construir algo más útil después
        start,
        end,
      };
    });
  } catch (error) {
    console.error("Error al obtener citas:", error);
    return [];
  }
}
