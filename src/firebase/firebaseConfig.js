import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyBRocpOEk2ILpt7_BoMXNR_tzoymtm8DSE",
  authDomain: "medibook-60739.firebaseapp.com",
  projectId: "medibook-60739",
  storageBucket: "medibook-60739.appspot.com",
  messagingSenderId: "742702166786",
  appId: "1:742702166786:web:07bccaff206f1cbd99881b",
  measurementId: "G-E7772F09TQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const functions = getFunctions(app, "us-central1"); // 👈 esta línea es CLAVE

// ✅ Exponer en window para pruebas (esto es opcional pero útil)
if (typeof window !== "undefined") {
  window.firebase = { app, auth, db, functions };
}

export { app, auth, db, functions };
