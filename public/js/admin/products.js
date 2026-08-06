// ==========================================================================
// PRODUCTS — OPERAÇÕES DE PRODUTOS NO FIRESTORE
// ==========================================================================

import { db, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "./firebase.js";

const COLECAO = "produtos";

// Lista todos os produtos (independente do status)
export async function listarProdutos() {
    const consulta = await getDocs(collection(db, COLECAO));
    const produtos = [];

    consulta.forEach(documento => {
        produtos.push({ id: documento.id, ...documento.data() });
    });

    return produtos;
}

// Cria um novo produto
export async function criarProduto(dados) {
    const normalizados = normalizarDados(dados);

    return addDoc(collection(db, COLECAO), normalizados);
}

// Atualiza os dados de um produto existente
export async function atualizarProduto(id, dados) {
    const normalizados = normalizarDados(dados);

    return updateDoc(doc(db, COLECAO, id), normalizados);
}

// Ativa ou desativa um produto
export async function alterarStatus(id, ativo) {
    return updateDoc(doc(db, COLECAO, id), { ativo: Boolean(ativo) });
}

// Exclui um produto
export async function excluirProduto(id) {
    return deleteDoc(doc(db, COLECAO, id));
}

// Padroniza os dados vindos do formulário
function normalizarDados({ nome, descricao, preco, categoria, imagem, ativo }) {
    return {
        nome: String(nome || "").trim(),
        descricao: String(descricao || "").trim(),
        preco: Number(preco) || 0,
        categoria: String(categoria || "").trim(),
        imagem: String(imagem || ""),
        ativo: Boolean(ativo)
    };
}