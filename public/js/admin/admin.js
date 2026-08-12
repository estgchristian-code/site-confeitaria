// ==========================================================================
// ADMIN — PAINEL ADMINISTRATIVO (ENTRADA)
// ==========================================================================
// Carregado por /admin/index.html. Protege a página (redireciona para o
// login quando não autenticado) e controla a interface do painel.

import { observarSessao, sair, redirecionarPara, usuarioAtual } from "./auth.js";
import {
    listarProdutos,
    criarProduto,
    atualizarProduto,
    alterarStatus,
    excluirProduto
} from "./products.js";
import { enviarImagem } from "./cloudinary.js";
import { excluirImagem } from "./storage.js";

const CATEGORIAS = ["Doces e bolos", "Salgados", "Bebidas", "Hambúrgueres"];

// Estado do painel
const estado = {
    produtos: [],
    filtro: "",
    editandoId: null,
    imagemAtual: "",
    enviando: false
};

// ==========================================================================
// UTILITÁRIOS DE APOIO
// ==========================================================================

function obterElemento(id) {
    return document.getElementById(id);
}

function formatarPreco(valor) {
    return `R$ ${Number(valor || 0).toFixed(2).replace(".", ",")}`;
}

// Ajusta caminhos locais (imagens/...) para a pasta /admin
function resolverImagem(caminho) {
    if (!caminho) return "../imagens/logo-norske-3.png";
    if (/^https?:\/\//i.test(caminho)) return caminho;
    return `../${caminho.replace(/^\//, "")}`;
}

function mostrarToast(mensagem, tipo = "sucesso") {
    const container = obterElemento("area-toasts");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${tipo}`;
    toast.setAttribute("role", "status");
    toast.textContent = mensagem;

    container.appendChild(toast);

    setTimeout(() => toast.remove(), 4000);
}

// ==========================================================================
// LISTA DE PRODUTOS
// ==========================================================================

async function carregarProdutos() {
    try {
        estado.produtos = await listarProdutos();
        desenharLista();
    } catch (erro) {
        console.error("Erro ao carregar produtos:", erro);
        mostrarToast("Não foi possível carregar os produtos. Verifique sua conexão.", "erro");
    }
}

function desenharLista() {
    const container = obterElemento("lista-produtos");
    if (!container) return;

    const filtro = estado.filtro.toLowerCase().trim();
    const visiveis = estado.produtos.filter(produto =>
        !filtro ||
        produto.nome.toLowerCase().includes(filtro) ||
        produto.categoria.toLowerCase().includes(filtro)
    );

    container.innerHTML = "";

    if (visiveis.length === 0) {
        container.innerHTML = `
            <div class="sem-produtos">
                ${estado.produtos.length === 0
                    ? "Nenhum produto cadastrado. Clique em \"+ Novo Produto\" para começar."
                    : "Nenhum produto encontrado para a pesquisa."}
            </div>
        `;
        return;
    }

    const fragmento = document.createDocumentFragment();

    visiveis.forEach(produto => {
        const item = document.createElement("article");
        item.className = `item-produto${produto.ativo ? "" : " inativo"}`;

        item.innerHTML = `
            <img class="miniatura" src="${resolverImagem(produto.imagem)}"
                 alt="${produto.nome}" loading="lazy">
            <div class="info-produto">
                <strong class="nome-produto">${produto.nome}</strong>
                <span class="categoria-produto">${produto.categoria || "Sem categoria"}</span>
            </div>
            <span class="preco-produto">${formatarPreco(produto.preco)}</span>
            <button class="botao-status ${produto.ativo ? "ativo" : "inativo"}"
                    data-acao="status" data-id="${produto.id}"
                    aria-pressed="${produto.ativo ? "true" : "false"}">
                ${produto.ativo ? "Ativo" : "Inativo"}
            </button>
            <div class="acoes-produto">
                <button class="btn-acoes btn-editar" data-acao="editar" data-id="${produto.id}">Editar</button>
                <button class="btn-acoes btn-excluir" data-acao="excluir" data-id="${produto.id}">Excluir</button>
            </div>
        `;

        fragmento.appendChild(item);
    });

    container.appendChild(fragmento);
}

// ==========================================================================
// FORMULÁRIO DE PRODUTO (CRIAR / EDITAR)
// ==========================================================================

function abrirFormulario(produto = null) {
    estado.editandoId = produto ? produto.id : null;
    estado.imagemAtual = produto ? produto.imagem || "" : "";
    estado.enviando = false;

    obterElemento("titulo-modal-produto").textContent = produto ? "Editar Produto" : "Novo Produto";
    obterElemento("campo-nome").value = produto ? produto.nome : "";
    obterElemento("campo-descricao").value = produto ? produto.descricao : "";
    obterElemento("campo-preco").value = produto ? produto.preco : "";
    obterElemento("campo-categoria").value = produto ? produto.categoria : CATEGORIAS[0];
    obterElemento("campo-status").checked = produto ? produto.ativo : true;

    const preview = obterElemento("preview-imagem");
    const campoArquivo = obterElemento("campo-imagem");
    campoArquivo.value = "";

    if (estado.imagemAtual) {
        preview.src = resolverImagem(estado.imagemAtual);
        preview.classList.remove("escondido");
    } else {
        preview.classList.add("escondido");
        preview.removeAttribute("src");
    }

    obterElemento("botao-salvar").textContent = produto ? "Salvar Alterações" : "Salvar Produto";
    abrirModal("modal-produto");
}

function preencherPreviewImagem() {
    const arquivo = obterElemento("campo-imagem").files[0];
    const preview = obterElemento("preview-imagem");

    if (!arquivo) {
        if (estado.imagemAtual) {
            preview.src = resolverImagem(estado.imagemAtual);
            preview.classList.remove("escondido");
        }
        return;
    }

    const leitor = new FileReader();
    leitor.onload = evento => {
        preview.src = evento.target.result;
        preview.classList.remove("escondido");
    };
    leitor.readAsDataURL(arquivo);
}

async function salvarProduto() {
    if (estado.enviando) return;

    const nome = obterElemento("campo-nome").value.trim();
    const descricao = obterElemento("campo-descricao").value.trim();
    const precoTexto = obterElemento("campo-preco").value.trim();
    const categoria = obterElemento("campo-categoria").value;
    const ativo = obterElemento("campo-status").checked;
    const arquivo = obterElemento("campo-imagem").files[0];

    if (!nome || !precoTexto || !categoria) {
        mostrarToast("Preencha ao menos nome, preço e categoria.", "erro");
        return;
    }

    const preco = parseFloat(precoTexto.replace(",", "."));
    if (isNaN(preco) || preco < 0) {
        mostrarToast("Informe um preço válido.", "erro");
        return;
    }

    estado.enviando = true;
    const botaoSalvar = obterElemento("botao-salvar");
    botaoSalvar.disabled = true;

    if (arquivo) {
        botaoSalvar.textContent = "Enviando imagem...";
    }

    try {
        let imagem = estado.imagemAtual;

        // Envia a nova imagem (se selecionada) para o Cloudinary e usa a
        // URL retornada (secure_url) no Firestore
        if (arquivo) {
            imagem = await enviarImagem(arquivo);
            botaoSalvar.textContent = "Salvando...";
        }

        const dados = { nome, descricao, preco, categoria, ativo, imagem };

        if (estado.editandoId) {
            await atualizarProduto(estado.editandoId, dados);
            mostrarToast("Produto atualizado com sucesso.");
        } else {
            await criarProduto(dados);
            mostrarToast("Produto criado com sucesso.");
        }

        fecharModal("modal-produto");
        await carregarProdutos();
    } catch (erro) {
        console.error("Erro ao salvar produto:", erro);
        mostrarToast("Não foi possível salvar o produto. Tente novamente.", "erro");
    } finally {
        estado.enviando = false;
        botaoSalvar.disabled = false;
        botaoSalvar.textContent = estado.editandoId ? "Salvar Alterações" : "Salvar Produto";
    }
}

// ==========================================================================
// EXCLUSÃO (COM CONFIRMAÇÃO)
// ==========================================================================

let produtoParaExcluir = null;

function pedirConfirmacaoExclusao(id) {
    const produto = estado.produtos.find(item => item.id === id);
    if (!produto) return;

    produtoParaExcluir = produto;
    obterElemento("nome-produto-excluir").textContent = produto.nome;
    abrirModal("modal-confirmar");
}

async function confirmarExclusao() {
    if (!produtoParaExcluir) return;

    const produto = produtoParaExcluir;
    produtoParaExcluir = null;

    obterElemento("botao-confirmar-excluir").disabled = true;

    try {
        await excluirProduto(produto.id);
        await excluirImagem(produto.imagem);
        fecharModal("modal-confirmar");
        mostrarToast("Produto excluído.");
        await carregarProdutos();
    } catch (erro) {
        console.error("Erro ao excluir produto:", erro);
        mostrarToast("Não foi possível excluir o produto.", "erro");
    } finally {
        obterElemento("botao-confirmar-excluir").disabled = false;
    }
}

// ==========================================================================
// MODAIS E EVENTOS
// ==========================================================================

function abrirModal(id) {
    const modal = obterElemento(id);
    if (modal) modal.classList.add("aberto");
}

function fecharModal(id) {
    const modal = obterElemento(id);
    if (modal) modal.classList.remove("aberto");
}

function inicializarEventos() {
    const lista = obterElemento("lista-produtos");

    // Delegação: status, editar e excluir
    lista.addEventListener("click", async evento => {
        const botao = evento.target.closest("[data-acao]");
        if (!botao) return;

        const id = botao.dataset.id;
        const acao = botao.dataset.acao;

        if (acao === "status") {
            const produto = estado.produtos.find(item => item.id === id);
            if (!produto) return;

            try {
                await alterarStatus(id, !produto.ativo);
                mostrarToast(`${produto.nome} ${produto.ativo ? "desativado" : "ativado"}.`);
                await carregarProdutos();
            } catch (erro) {
                console.error("Erro ao alterar status:", erro);
                mostrarToast("Não foi possível alterar o status.", "erro");
            }
        } else if (acao === "editar") {
            const produto = estado.produtos.find(item => item.id === id);
            if (produto) abrirFormulario(produto);
        } else if (acao === "excluir") {
            pedirConfirmacaoExclusao(id);
        }
    });

    // Pesquisa
    obterElemento("campo-pesquisa").addEventListener("input", evento => {
        estado.filtro = evento.target.value;
        desenharLista();
    });

    // Novo produto
    obterElemento("btn-novo-produto").addEventListener("click", () => abrirFormulario());

    // Formulário
    obterElemento("form-produto").addEventListener("submit", evento => {
        evento.preventDefault();
        salvarProduto();
    });

    // Fechamentos
    obterElemento("btn-fechar-modal-produto").addEventListener("click", () => fecharModal("modal-produto"));
    obterElemento("btn-cancelar-produto").addEventListener("click", () => fecharModal("modal-produto"));
    obterElemento("btn-cancelar-excluir").addEventListener("click", () => {
        produtoParaExcluir = null;
        fecharModal("modal-confirmar");
    });

    // Confirmação de exclusão
    obterElemento("botao-confirmar-excluir").addEventListener("click", confirmarExclusao);

    // Preview da imagem selecionada
    obterElemento("campo-imagem").addEventListener("change", preencherPreviewImagem);

    // Sair
    obterElemento("btn-sair").addEventListener("click", async () => {
        try {
            await sair();
        } finally {
            redirecionarPara("/admin/login.html");
        }
    });

    // Fecha modal ao clicar fora (apenas no modal de confirmação)
    document.querySelectorAll(".modal").forEach(modal => {
        modal.addEventListener("click", evento => {
            if (evento.target === modal && modal.id === "modal-confirmar") {
                produtoParaExcluir = null;
                fecharModal(modal.id);
            }
        });
    });
}

// ==========================================================================
// INICIALIZAÇÃO COM PROTEÇÃO DA PÁGINA
// ==========================================================================

observarSessao(usuario => {
    if (!usuario) {
        redirecionarPara("/admin/login.html");
        return;
    }

    const nomeExibicao = usuario.email || "Administrador";
    const spanUsuario = obterElemento("usuario-logado");
    if (spanUsuario) spanUsuario.textContent = nomeExibicao;

    inicializarEventos();
    carregarProdutos();
});