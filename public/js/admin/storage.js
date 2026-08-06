// ==========================================================================
// STORAGE — ENVIO E REMOÇÃO DE IMAGENS
// ==========================================================================

import { storage, ref, uploadBytes, getDownloadURL, deleteObject } from "./firebase.js";

// Sanitiza o nome do arquivo para uso seguro no caminho do Storage
function nomeSeguro(nome) {
    return String(nome || "imagem")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .toLowerCase() || "imagem";
}

// Envia a imagem para o Firebase Storage e devolve a URL pública
export async function enviarImagem(arquivo, nomeProduto) {
    const extensao = (arquivo.name.split(".").pop() || "png").toLowerCase();
    const caminho = `produtos/${Date.now()}-${nomeSeguro(nomeProduto)}.${extensao}`;
    const imagemRef = ref(storage, caminho);

    await uploadBytes(imagemRef, arquivo);

    return getDownloadURL(imagemRef);
}

// Remove a imagem do Storage (ignora falhas quando o arquivo não existe)
export async function excluirImagem(url) {
    if (!url || !/^https?:\/\//i.test(url)) return;

    try {
        await deleteObject(ref(storage, url));
    } catch (erro) {
        console.warn("Imagem não removida do Storage:", url, erro);
    }
}