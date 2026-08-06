// ==========================================================================
// INICIALIZAÇÃO DO FIREBASE (SDK Modular)
// ==========================================================================
// Centraliza a inicialização do Firebase e reexporta as funções do SDK.
// O app, o Firestore (db) e o Authentication (auth) ficam disponíveis para
// qualquer módulo (cardápio, futura área administrativa etc.).

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };

// Firestore — leitura (usada pelo cardápio)
export {
    collection,
    doc,
    getDocs,
    getDoc,
    query,
    where,
    orderBy,
    limit,
    onSnapshot
} from "firebase/firestore";

// Firestore — escrita (para a futura área administrativa)
export {
    addDoc,
    updateDoc,
    deleteDoc
} from "firebase/firestore";

// Authentication (para a futura área administrativa)
export {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";