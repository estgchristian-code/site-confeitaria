// ==========================================================================
// AUTH — AUTENTICAÇÃO DO PAINEL
// ==========================================================================

import { auth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "./firebase.js";

// Login com e-mail e senha
export async function entrar(email, senha) {
    return signInWithEmailAndPassword(auth, email, senha);
}

// Encerra a sessão
export async function sair() {
    return signOut(auth);
}

// Observa a sessão (chamada de retorno recebe o usuário ou null)
export function observarSessao(callback) {
    return onAuthStateChanged(auth, callback);
}

// Redireciona para outra página do painel
export function redirecionarPara(caminho) {
    window.location.replace(caminho);
}

// Usuário autenticado no momento (ou null)
export function usuarioAtual() {
    return auth.currentUser;
}