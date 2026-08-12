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

// Redireciona para outra página do painel. O destino é resolvido relativo ao
// diretório da página atual, funcionando com o prefixo "/public" do ambiente
// local (Live Server) e com o site na raiz em produção (Vercel).
export function redirecionarPara(caminho) {
    const diretorioAtual = location.pathname.substring(0, location.pathname.lastIndexOf("/") + 1);
    const nomeArquivo = caminho.split("/").pop();
    window.location.replace(diretorioAtual + nomeArquivo);
}

// Usuário autenticado no momento (ou null)
export function usuarioAtual() {
    return auth.currentUser;
}