import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

// Helper para reintentar la carga de usuario de Firestore
async function fetchUserData(uid, retries = 3, delayMs = 250) {
  for (let i = 0; i < retries; i++) {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) return userSnap.data();
    await new Promise(res => setTimeout(res, delayMs)); // Espera entre intentos
  }
  return null; // No encontrado tras varios intentos
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userData = await fetchUserData(firebaseUser.uid, 3, 250);
          if (userData) {
            setUser({ uid: firebaseUser.uid, ...userData });
          } else {
            console.warn("⚠️ Usuario no encontrado en Firestore tras varios intentos");
            setUser(null);
          }
        } catch (error) {
          console.error("❌ Error al cargar datos del usuario:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
