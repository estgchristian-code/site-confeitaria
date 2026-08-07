// ==========================================================================
// INICIALIZAÇÃO DO FIREBASE (SDK Modular)
// ==========================================================================
// Centraliza a inicialização do Firebase e reexporta as funções do SDK.
// O app, o Firestore (db) e o Authentication (auth) ficam disponíveis para
// qualquer módulo (cardápio, futura área administrativa etc.).
//
// Nota: os imports usam URLs completas do CDN do Firebase (padrão oficial do
// SDK modular) em vez de importmap, porque o importmap inline é bloqueado
// pela Content-Security-Policy do site.

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";
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
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

// Firestore — escrita (para a futura área administrativa)
export {
    addDoc,
    updateDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

// Authentication (para a futura área administrativa)
export {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";