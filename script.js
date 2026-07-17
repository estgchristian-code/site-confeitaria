// ==========================================================================
// 1. LISTA DE PRODUTOS (Altere, adicione ou remova itens aqui!)
// ==========================================================================

const doces = [
    {
        nome: "Ninho com Nutella",
        descricao: "Camadas de creme de Leite Ninho com Nutella. 250g.",
        preco: "R$ 12,00",
        imagem: "imagens/ninho-nutella.png"
    },
    {
        nome: "Sensação",
        descricao: "Chocolate com morango. 250g.",
        preco: "R$ 11,00",
        imagem: "imagens/sensacao.jpeg"
    },
    {
        nome: "Bolo de Cenoura",
        descricao: "Bolo de cenoura com calda de brigadeiro.",
        preco: "R$ 15,00",
        imagem: "imagens/bolo-cenoura.jpeg"
    }
];

const salgados = [
    {
        nome: "Coxinha",
        descricao: "Kit com 10 coxinhas artesanais e super temperadas. 340g.",
        preco: "R$ 17,00",
        imagem: "imagens/coxinha.png"
    },
    {
        nome: "Kit Salgadinhos",
        descricao: "Kit com 12 salgadinhos, incluindo coxinha, bolinha de queijo e risoles de carne. 350g.",
        preco: "R$ 15,00",
        imagem: "imagens/kit-salgadinhos.png"
    }
];

const bebidas = [
    {
        nome: "Coca-Cola Lata",
        descricao: "Coca orig. 350ml.",
        preco: "R$ 7,00",
        imagem: "imagens/coca.png"
    },
    {
        nome: "Coca-Cola Lata Zero",
        descricao: "Coca zero 350ml.",
        preco: "R$ 7,00",
        imagem: "imagens/coca-zero.png"
    },
    {
        nome: "Pepsi Lata",
        descricao: "Pepsi orig. 350ml.",
        preco: "R$ 7,00",
        imagem: "imagens/pepsi.png"
    },
    {
        nome: "Refrigerante Guaraná",
        descricao: "Guaraná Antártica orig. 350ml.",
        preco: "R$ 7,00",
        imagem: "imagens/guarana.png"
    },
    {
        nome: "Refrigerante Guaraná Zero",
        descricao: "Guaraná Antártica zero. 350ml.",
        preco: "R$ 7,00",
        imagem: "imagens/guarana-zero.png"
    },
    {
        nome: "Sprite Lata",
        descricao: "Sprite original 350ml.",
        preco: "R$ 7,00",
        imagem: "imagens/sprite.png"
    },


    {
        nome: "Coca-Cola 2L",
        descricao: "Coca 2L.",
        preco: "R$ 15,00",
        imagem: "imagens/coca-cola.png"
    },
    {
        nome: "Pepsi 2L",
        descricao: "Pepsi 2L.",
        preco: "R$ 15,00",
        imagem: "imagens/pepsi2l.png"
    },
    {
        nome: "Guaraná 2L",
        descricao: "Guaraná 2L.",
        preco: "R$ 14,00",
        imagem: "imagens/guarana2l.png"
    },
    {
        nome: "Sprite 2L",
        descricao: "Sprite 2L.",
        preco: "R$ 13,00",
        imagem: "imagens/sprite2L.png"
    },
    {
        nome: "Água sem Gás",
        descricao: "Água s/ gás cristal azul 500ml.",
        preco: "R$ 4,00",
        imagem: "imagens/agua-sem-gas.png"
    },
    {
        nome: "Água com Gás",
        descricao: "Água c/ gás Font Life 500ml.",
        preco: "R$ 4,00",
        imagem: "imagens/agua-com-gas.png"
    },
    {
        nome: "Chá Matte Leão",
        descricao: "Chá matte leão orig. Copo 300ml.",
        preco: "R$ 7,00",
        imagem: "imagens/cha-mate.png"
    },
    {
        nome: "Monster Lata",
        descricao: "Monster 473ml.",
        preco: "R$ 13,00",
        imagem: "imagens/monster.png"
    }
];

const hamburgueres = [
    {
        nome: "X-Burguer",
        descricao: "Pão, maionese, 90g de hambúrguer caseiro, mussarela.",
        preco: "R$ 11,00",
        imagem: "imagens/x-burguer.png"
    },
    {
        nome: "X-Salada",
        descricao: "Pão, maionese, 90g de hambúrguer caseiro, mussarela, presunto, alface e tomate.",
        preco: "R$ 12,00",
        imagem: "imagens/x-salada.png"
    },
    {
        nome: "X-Egg",
        descricao: "Pão, maionese, 90g de hambúrguer caseiro, ovo, mussarela, presunto, alface e tomate.",
        preco: "R$ 15,00",
        imagem: "imagens/x-egg.png"
    },
    {
        nome: "X-Calabresa",
        descricao: "Pão, maionese, 90g de hambúrguer caseiro, calabresa, mussarela, presunto, alface e tomate.",
        preco: "R$ 15,00",
        imagem: "imagens/x-calabresa02.png"
    },
    {
        nome: "X-Frango",
        descricao: "Pão, maionese, 90g de filé de frango, mussarela, catupiry, alface e tomate.",
        preco: "R$ 15,00",
        imagem: "imagens/x-frango.png"
    },
    {
        nome: "X-Bacon",
        descricao: "Pão, maionese, 90g de hambúrguer caseiro, bacon, mussarela, presunto, alface e tomate.",
        preco: "R$ 15,00",
        imagem: "imagens/x-bacon.png"
    },
    {
        nome: "X-Tudo",
        descricao: "Pão, maionese, 90g de hambúrguer caseiro, filé de frango, calabresa, ovo, bacon mussarela, presunto, alface e tomate.",
        preco: "R$ 21,00",
        imagem: "imagens/x-tudo.jpeg"
    },
    {
        nome: "X da casa",
        descricao: "Pão, maionese, 90g de hambúrguer caseiro, filé de frango, calabresa, ovo, bacon, mussarela, cheddar, batata palha, presunto, alface e tomate.",
        preco: "R$ 26,00",
        imagem: "imagens/x-casa.jpeg"
    },
    {
        nome: "X-Dog",
        descricao: "Pão, maionese, duas vinas, bacon catupiry, batata palha, farofa, milho, ervilha e tomate.",
        preco: "R$ 14,00",
        imagem: "imagens/x-dog.jpeg"
    }
];


// ==========================================================================
// 2. CONFIGURAÇÃO GERAL E LÓGICA DO CARRINHO
// ==========================================================================

const numeroWhats = "5541997373544"; // Número oficial da Confeitaria Norske!
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Função que desenha os produtos na tela
function renderizarProdutos(listaDeProdutos, idDoContainer) {
    const container = document.getElementById(idDoContainer);
    
    if (listaDeProdutos.length === 0) return;

    listaDeProdutos.forEach(produto => {
        const cardHTML = `
            <div class="card-produto">
                <img src="${produto.imagem}" alt="${produto.nome}" class="img-produto" loading="lazy">
                <div class="detalhes-produto">
                    <h3>${produto.nome}</h3>
                    <p class="descricao">${produto.descricao}</p>
                    <p class="preco">${produto.preco}</p>
                    <button class="btn-whatsapp" onclick="adicionarAoCarrinho('${produto.nome}', '${produto.preco}')">
                        + Adicionar
                    </button>
                </div>
            </div>
        `;
        
        container.innerHTML += cardHTML;
    });
}

// Executa a função para cada uma das categorias quando a página carrega
renderizarProdutos(doces, 'lista-doces');
renderizarProdutos(salgados, 'lista-salgados');
renderizarProdutos(bebidas, 'lista-bebidas');
renderizarProdutos(hamburgueres, 'lista-hamburgueres');

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
    if (!modal.classList.contains("escondido")) {
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
    
    containerItens.innerHTML = "";
    let totalGeral = 0;
    
    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        totalGeral += subtotal;
        
        containerItens.innerHTML += `
            <div class="item-lista-carrinho">
                <span><strong>${item.quantidade}x</strong> ${item.nome}</span>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span>R$ ${subtotal.toFixed(2).replace(".", ",")}</span>
                    <button class="btn-remover-item" onclick="removerDoCarrinho('${item.nome}')" title="Remover item">❌</button>
                </div>
            </div>
        `;
    });
    
    valorTotalSpan.innerText = `R$ ${totalGeral.toFixed(2).replace(".", ",")}`;
    modal.classList.remove("escondido");
}

function fecharModalCarrinho() {
    document.getElementById("modal-carrinho").classList.add("escondido");
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
    if (window.scrollY > 400) {
        btn.classList.remove('escondido');
    } else {
        btn.classList.add('escondido');
    }
});