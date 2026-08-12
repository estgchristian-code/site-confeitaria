// ==========================================================================
// STORAGE — REMOÇÃO DE IMAGENS LEGADAS DO FIREBASE STORAGE
// ==========================================================================

import { storage, ref, deleteObject } from "./firebase.js";

// Remove a imagem do Firebase Storage (apenas URLs legadas do Firebase).
// URLs do Cloudinary não são enviadas para o Storage.
export async function excluirImagem(url) {
    if (!url || !/^https?:\/\//i.test(url)) return;
    if (!/firebasestorage\.googleapis\.com/i.test(url)) return;

    try {
        await deleteObject(ref(storage, url));
    } catch (erro) {
        console.warn("Imagem não removida do Storage:", url, erro);
    }
}