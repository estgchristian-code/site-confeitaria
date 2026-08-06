// ==========================================================================
// MIGRAÇÃO DO CARDÁPIO PARA O FIREBASE FIRESTORE
// ==========================================================================
// Envia para a coleção "produtos" os produtos do cardápio anterior
// (extraídos do script.js original), sem duplicar o que já existe.
//
// Uso:  node scripts/migrar-produtos.mjs
//
// Campos gravados por produto:
//   nome (string) | descricao (string) | preco (double) | categoria (string)
//   imagem (string) | ativo (boolean = true)

import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

import { firebaseConfig } from "../public/js/firebase-config.js";

const diretorioAtual = dirname(fileURLToPath(import.meta.url));
const produtosMigracao = JSON.parse(
    readFileSync(join(diretorioAtual, "produtos-antigos.json"), "utf8")
);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function normalizarNome(nome) {
    return String(nome || "").trim().toLowerCase();
}

async function migrar() {
    const refProdutos = collection(db, "produtos");

    // Produtos já cadastrados no Firestore (pela "nome", sem diferenciar caixa)
    const jaCadastrados = new Set();
    const consulta = await getDocs(refProdutos);
    consulta.forEach(documento => {
        jaCadastrados.add(normalizarNome(documento.data().nome));
    });

    let adicionados = 0;
    let ignorados = 0;

    for (const produto of produtosMigracao) {
        if (jaCadastrados.has(normalizarNome(produto.nome))) {
            ignorados++;
            console.log(`IGNORADO (já existe): ${produto.nome}`);
            continue;
        }

        // Garantia adicional: marca como existente para não depender de
        // duplicadas dentro do próprio lista de migração
        jaCadastrados.add(normalizarNome(produto.nome));

        await addDoc(refProdutos, {
            nome: produto.nome,
            descricao: produto.descricao,
            preco: produto.preco,
            categoria: produto.categoria,
            imagem: produto.imagem,
            ativo: produto.ativo
        });

        adicionados++;
        console.log(`ADIICIONADO: ${produto.nome} (${produto.categoria})`);
    }

    console.log("----------------------------------------");
    console.log(`Total no arquivo de migração: ${produtosMigracao.length}`);
    console.log(`Adicionados ao Firestore: ${adicionados}`);
    console.log(`Ignorados (já existentes): ${ignorados}`);

    process.exit(0);
}

migrar().catch(erro => {
    console.error("Erro na migração:", erro);
    process.exit(1);
});