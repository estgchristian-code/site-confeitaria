// ==========================================================================
// 1. PRODUTOS (carregados do Firebase Firestore)
// ==========================================================================

import { db, collection, getDocs, query, where } from "./js/firebase.js";

// Recupera e desenha na tela todos os produtos "ativos" do Firestore,
// agrupando-os por categoria nos containers existentes no HTML.
async function carregarProdutos() {
    const q = query(collection(db, "produtos"), where("ativo", "==", true));

    // Mapeamento: valor do campo "categoria" no Firestore -> id do container.
    // Aceita os nomes das seções ("Doces e bolos", ...) e chaves curtas,
    // ignorando maiúsculas/minúsculas e acentos.
    const containersPorCategoria = {
        "doces": "lista-doces",
        "doces e bolos": "lista-doces",
        "salgados": "lista-salgados",
        "bebidas": "lista-bebidas",
        "hamburgueres": "lista-hamburgueres",
        "hamburguers": "lista-hamburgueres",
        "hamburguer": "lista-hamburgueres"
    };

    // Agrupa os produtos carregados por container (seção do cardápio)
    const produtosPorCategoria = {};
    for (const id in containersPorCategoria) {
        produtosPorCategoria[containersPorCategoria[id]] = [];
    }

    try {
        const consulta = await getDocs(q);

        consulta.forEach(documento => {
            const dados = documento.data();
            const idContainer = containersPorCategoria[normalizarCategoria(dados.categoria)];

            if (idContainer) {
                produtosPorCategoria[idContainer].push({
                    nome: dados.nome,
                    descricao: dados.descricao,
                    preco: formatarPreco(dados.preco),
                    imagem: normalizarImagem(dados.imagem)
                });
            } else {
                console.warn("Produto com categoria sem seção no site foi ignorado:", dados.nome, "->", dados.categoria);
            }
        });

        for (const idContainer in produtosPorCategoria) {
            renderizarProdutos(produtosPorCategoria[idContainer], idContainer);
        }

        if (consulta.empty) {
            console.warn("Nenhum produto ativo encontrado no Firestore.");
        }
    } catch (erro) {
        console.error("Erro ao carregar produtos do Firestore:", erro);
    }
}

// Normaliza o valor do campo "categoria" para busca no mapa de containers
// (remove acentos, caixa alta e espaços extras)
function normalizarCategoria(valor) {
    return String(valor || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

// Garante que a imagem do produto aponte para um arquivo local relativo
// ("imagens/<arquivo>"). Funciona com URLs completas do Storage, caminhos
// absolutos, caminhos relativos ou apenas o nome do arquivo.
function normalizarImagem(caminho) {
    // Sem imagem cadastrada: usa o logo local para não quebrar o card
    if (!caminho) {
        return "imagens/logo-norske-3.png";
    }

    let valor = String(caminho);

    // URLs completas (ex.: imagens enviadas pelo painel para o Firebase
    // Storage) são usadas exatamente como estão
    if (/^https?:\/\//i.test(valor)) {
        return valor;
    }

    // Remove parâmetros de URL (ex.: "?alt=media&token=...")
    valor = valor.split(/[?#]/)[0];

    // Decodifica caracteres codificados (ex.: "imagens%2Fcoca.png")
    try {
        valor = decodeURIComponent(valor);
    } catch (erro) {
        // Mantém o valor original se não for uma codificação válida
    }

    // Extrai somente o nome do arquivo final
    const nomeArquivo = valor.split("/").pop();

    return `imagens/${nomeArquivo}`;
}

// Converte o preço numérico (ex.: 12) no formato exibido e usado pelo
// carrinho (ex.: "R$ 12,00")
function formatarPreco(valor) {
    if (valor === null || valor === undefined || isNaN(valor)) {
        return "R$ 0,00";
    }

    return `R$ ${Number(valor).toFixed(2).replace(".", ",")}`;
}


// ==========================================================================
// 2. CONFIGURAÇÃO GERAL E LÓGICA DO CARRINHO
// ==========================================================================

const numeroWhats = "5541997373544"; // Número oficial da Confeitaria Norske!
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Função que desenha os produtos na tela (usa criação de nós com textContent
// para evitar XSS — dados do Firestore são tratados como texto, nunca HTML)
function renderizarProdutos(listaDeProdutos, idDoContainer) {
    const container = document.getElementById(idDoContainer);

    if (!container || listaDeProdutos.length === 0) return;

    listaDeProdutos.forEach(produto => {
        const card = document.createElement("div");
        card.className = "card-produto";

        const img = document.createElement("img");
        img.src = produto.imagem;
        img.alt = produto.nome;
        img.className = "img-produto";
        img.loading = "lazy";

        const detalhes = document.createElement("div");
        detalhes.className = "detalhes-produto";

        const titulo = document.createElement("h3");
        titulo.textContent = produto.nome;

        const descricao = document.createElement("p");
        descricao.className = "descricao";
        descricao.textContent = produto.descricao;

        const preco = document.createElement("p");
        preco.className = "preco";
        preco.textContent = produto.preco;

        const botao = document.createElement("button");
        botao.className = "btn-whatsapp";
        botao.dataset.nome = produto.nome;
        botao.dataset.preco = produto.preco;
        botao.textContent = "+ Adicionar";

        detalhes.append(titulo, descricao, preco, botao);
        card.append(img, detalhes);
        container.appendChild(card);
    });
}

// Carrega os produtos do Firestore assim que a página abre
carregarProdutos();

// Restaura o carrinho salvo no navegador (se houver)
atualizarInterfaceCarrinho();

// Salva o carrinho no navegador para não perder ao recarregar
function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Funções de Controle do Carrinho
function adicionarAoCarrinho(nome, precoTexto) {
    const preco = parseFloat(precoTexto.replace("R$ ", "").replace(",", "."));
    const itemExistente = carrinho.find(item => item.nome === nome);
    
    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({ nome, preco, quantidade: 1 });
    }
    
    salvarCarrinho();
    atualizarInterfaceCarrinho();
}

// Remove 1 unidade do item ou tira do carrinho se zerar
function removerDoCarrinho(nome) {
    const itemExistente = carrinho.find(item => item.nome === nome);
    
    if (itemExistente) {
        itemExistente.quantidade -= 1;
        
        // Se a quantidade chegou a 0, removemos o item de vez
        if (itemExistente.quantidade <= 0) {
            carrinho = carrinho.filter(item => item.nome !== nome);
        }
    }
    
    salvarCarrinho();
    atualizarInterfaceCarrinho();
    
    // Se o modal estiver aberto, atualiza ele em tempo real
    const modal = document.getElementById("modal-carrinho");
    if (modal && !modal.classList.contains("escondido")) {
        if (carrinho.length === 0) {
            fecharModalCarrinho();
        } else {
            abrirModalCarrinho();
        }
    }
}

function atualizarInterfaceCarrinho() {
    const contador = document.getElementById("contador-itens");
    const barraFixa = document.getElementById("carrinho-fixo");
    
    if (!contador || !barraFixa) return;

    const totalItens = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
    contador.innerText = totalItens;
    
    if (totalItens > 0) {
        barraFixa.classList.remove("escondido");
    } else {
        barraFixa.classList.add("escondido");
    }
}

function abrirModalCarrinho() {
    const modal = document.getElementById("modal-carrinho");
    const containerItens = document.getElementById("itens-carrinho");
    const valorTotalSpan = document.getElementById("valor-total");
    
    if (!modal || !containerItens || !valorTotalSpan) return;

    // Limpa o conteúdo anterior com replaceChildren (sem innerHTML)
    containerItens.replaceChildren();
    let totalGeral = 0;

    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        totalGeral += subtotal;

        const itemLinha = document.createElement("div");
        itemLinha.className = "item-lista-carrinho";

        const nome = document.createElement("span");
        const quantidade = document.createElement("strong");
        quantidade.textContent = `${item.quantidade}x`;
        nome.append(quantidade, ` ${item.nome}`);

        const acoes = document.createElement("div");
        acoes.className = "acoes-item-carrinho";

        const subtotalSpan = document.createElement("span");
        subtotalSpan.textContent = `R$ ${subtotal.toFixed(2).replace(".", ",")}`;

        const botaoRemover = document.createElement("button");
        botaoRemover.className = "btn-remover-item";
        botaoRemover.dataset.nome = item.nome;
        botaoRemover.title = "Remover item";
        botaoRemover.textContent = "❌";

        acoes.append(subtotalSpan, botaoRemover);
        itemLinha.append(nome, acoes);
        containerItens.appendChild(itemLinha);
    });
    
    valorTotalSpan.innerText = `R$ ${totalGeral.toFixed(2).replace(".", ",")}`;
    modal.classList.remove("escondido");
}

function fecharModalCarrinho() {
    const modal = document.getElementById("modal-carrinho");
    if (modal) modal.classList.add("escondido");
}

function enviarPedidoWhatsApp() {
    if (carrinho.length === 0) return;
    
    let mensagem = "Olá! Gostaria de fazer o seguinte pedido:\n\n";
    let totalGeral = 0;
    
    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        totalGeral += subtotal;
        mensagem += `• ${item.quantidade}x ${item.nome} - R$ ${subtotal.toFixed(2).replace(".", ",")}\n`;
    });
    
    mensagem += `\n*Total: R$ ${totalGeral.toFixed(2).replace(".", ",")}*`;
    
    const linkWhats = `https://wa.me/${numeroWhats}?text=${encodeURIComponent(mensagem)}`;
    window.open(linkWhats, "_blank");
}

// ==========================================================================
// 3. BOTÃO VOLTAR AO TOPO
// ==========================================================================

function voltarAoTopo() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', function() {
    const btn = document.getElementById('btn-topo');
    if (btn) {
        if (window.scrollY > 400) {
            btn.classList.remove('escondido');
        } else {
            btn.classList.add('escondido');
        }
    }
});

// ==========================================================================
// 4. CONTROLE DE TAMANHO DE FONTE (ACESSIBILIDADE)
// ==========================================================================

let fontScale = 100; // Porcentagem padrão (100%)

const btnAumentar = document.getElementById('btn-aumentar-fonte');
const btnDiminuir = document.getElementById('btn-diminuir-fonte');
const btnReset = document.getElementById('btn-reset-fonte');

// Altera o tamanho da fonte diretamente na raiz (HTML), afetando todas as unidades 'rem'
if (btnAumentar) {
    btnAumentar.addEventListener('click', () => {
        if (fontScale < 140) {
            fontScale += 10;
            document.documentElement.style.fontSize = `${fontScale}%`;
        }
    });
}

if (btnDiminuir) {
    btnDiminuir.addEventListener('click', () => {
        if (fontScale > 80) {
            fontScale -= 10;
            document.documentElement.style.fontSize = `${fontScale}%`;
        }
    });
}

if (btnReset) {
    btnReset.addEventListener('click', () => {
        fontScale = 100;
        document.documentElement.style.fontSize = '100%';
    });
}

// ==========================================================================
// 5. MODO DALTÔNICO / ALTO CONTRASTE
// ==========================================================================

const btnDaltonico = document.getElementById('btn-daltonico');

// Verifica se o usuário já havia ativado o modo anteriormente
if (localStorage.getItem('modoDaltonico') === 'ativo') {
  document.body.classList.add('modo-daltonico');
}

if (btnDaltonico) {
  btnDaltonico.addEventListener('click', () => {
    // Alterna a classe no body
    document.body.classList.toggle('modo-daltonico');

    // Salva a preferência no localStorage
    if (document.body.classList.contains('modo-daltonico')) {
      localStorage.setItem('modoDaltonico', 'ativo');
    } else {
      localStorage.setItem('modoDaltonico', 'inativo');
    }
  });
}

// ==========================================================================
// 6. EVENTOS COM addEventListener (CSP "script-src 'self'" — sem handlers
//    inline, garantindo que o Content-Security-Policy do vercel.json funcione)
// ==========================================================================

// Delegação de eventos: botões criados dinamicamente (produtos e carrinho)
document.addEventListener('click', function (evento) {
    const btnAdicionar = evento.target.closest('.btn-whatsapp');

    if (btnAdicionar) {
        adicionarAoCarrinho(btnAdicionar.dataset.nome, btnAdicionar.dataset.preco);
        return;
    }

    const btnRemover = evento.target.closest('.btn-remover-item');

    if (btnRemover) {
        removerDoCarrinho(btnRemover.dataset.nome);
    }
});

// Botões estáticos do HTML
const btnVerCarrinho = document.getElementById('btn-ver-carrinho');
if (btnVerCarrinho) btnVerCarrinho.addEventListener('click', abrirModalCarrinho);

const btnFechar = document.querySelector('.btn-fechar');
if (btnFechar) btnFechar.addEventListener('click', fecharModalCarrinho);

const btnEnviarWhats = document.querySelector('.btn-enviar-whats');
if (btnEnviarWhats) btnEnviarWhats.addEventListener('click', enviarPedidoWhatsApp);

const btnTopo = document.getElementById('btn-topo');
if (btnTopo) btnTopo.addEventListener('click', voltarAoTopo);