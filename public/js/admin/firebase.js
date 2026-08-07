// ==========================================================================
// FIREBASE — ADMINISTRAÇÃO
// ==========================================================================
// Ponto central do painel administrativo: reutiliza o app/db/auth já
// inicializados pelo site e adiciona o Firebase Storage.
//
// Nota: os imports usam URLs completas do CDN do Firebase (padrão oficial do
// SDK modular) em vez de importmap, porque o importmap inline é bloqueado
// pela Content-Security-Policy do site.

import { app, db, auth } from "../firebase.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-storage.js";

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
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

// Storage
export {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-storage.js";

// Authentication
export {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";