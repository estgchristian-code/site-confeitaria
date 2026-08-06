// ==========================================================================
// FIREBASE — ADMINISTRAÇÃO
// ==========================================================================
// Ponto central do painel administrativo: reutiliza o app/db/auth já
// inicializados pelo site e adiciona o Firebase Storage.

import { app, db, auth } from "../firebase.js";
import { getStorage } from "firebase/storage";

const storage = getStorage(app);

export { app, db, auth, storage };

// Firestore
export {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    addDoc,
    updateDoc,
    deleteDoc,
    onSnapshot
} from "firebase/firestore";

// Storage
export {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject
} from "firebase/storage";

// Authentication
export {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";