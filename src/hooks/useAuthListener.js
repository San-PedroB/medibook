import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export default function useAuthListener() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        console.log("✅ Usuario autenticado:", firebaseUser.email);
      } else {
        console.log("❌ No hay sesión activa");
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
}
