// ==========================================================================
// PRODUCTS — OPERAÇÕES DE PRODUTOS NO FIRESTORE
// ==========================================================================

import { db, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "./firebase.js";

const COLECAO = "produtos";

// Limites de tamanho para os campos de texto (mesmos limites das regras
// do Firestore — manter em sincronia com firestore.rules)
const LIMITES = {
    nome: 100,
    descricao: 500,
    categoria: 50,
    imagem: 500
};

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

// Padroniza e valida os dados vindos do formulário. Campos de texto são
// limitados em tamanho e convertidos em string; preço vira número
// não-negativo; nada é interpretado como HTML (evita XSS).
function normalizarDados({ nome, descricao, preco, categoria, imagem, ativo }) {
    const texto = (valor, limite) => String(valor || "").trim().slice(0, limite);

    const precoNumero = Number(preco);
    const precoNormalizado =
        Number.isFinite(precoNumero) && precoNumero >= 0 ? precoNumero : 0;

    return {
        nome: texto(nome, LIMITES.nome),
        descricao: texto(descricao, LIMITES.descricao),
        preco: precoNormalizado,
        categoria: texto(categoria, LIMITES.categoria),
        imagem: String(imagem || "").slice(0, LIMITES.imagem),
        ativo: Boolean(ativo)
    };
}