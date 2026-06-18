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
        descricao: "Kit com 6 coxinhas. 300g.",
        preco: "R$ 12,00",
        imagem: "imagens/coxinha.png"
    },
    {
        nome: "Quibe",
        descricao: "Kit com 6 quibes. 300g.",
        preco: "R$ 12,00",
        imagem: "imagens/quibe.png"
    }
];

const bebidas = [
    {
        nome: "Coca-Cola Lata",
        descricao: "Coca orig. 350ml.",
        preco: "R$ 6,00",
        imagem: "imagens/coca.png"
    },
    {
        nome: "Coca-Cola Lata Zero",
        descricao: "Coca zero 350ml.",
        preco: "R$ 6,00",
        imagem: "imagens/coca-zero.png"
    },
    {
        nome: "Pepsi Lata",
        descricao: "Pepsi orig. 350ml.",
        preco: "R$ 6,00",
        imagem: "imagens/pepsi.png"
    },
    {
        nome: "Refrigerante Guaraná",
        descricao: "Guaraná Antártica orig. 350ml.",
        preco: "R$ 6,00",
        imagem: "imagens/guarana.png"
    },
    {
        nome: "Refrigerante Guaraná Zero",
        descricao: "Guaraná Antártica zero. 350ml.",
        preco: "R$ 6,00",
        imagem: "imagens/guarana-zero.png"
    },
    {
        nome: "Sprite Lata",
        descricao: "Sprite original 350ml.",
        preco: "R$ 6,00",
        imagem: "imagens/sprite.png"
    },
    {
        nome: "Refrigerante Sabores 200ml",
        descricao: "Refri sabores 200ml.",
        preco: "R$ 3,50",
        imagem: "imagens/refri-200ml.png"
    },
    {
        nome: "Refrigerante 600ml",
        descricao: "Refri 600ml.",
        preco: "R$ 8,00",
        imagem: "imagens/refri-600ml.png"
    },
    {
        nome: "Coca-Cola 2L",
        descricao: "Coca 2L.",
        preco: "R$ 14,00",
        imagem: "imagens/coca-2l.png"
    },
    {
        nome: "Pepsi 2L",
        descricao: "Pepsi 2L.",
        preco: "R$ 14,00",
        imagem: "imagens/pepsi-2l.png"
    },
    {
        nome: "Guaraná 2L",
        descricao: "Guaraná 2L.",
        preco: "R$ 13,00",
        imagem: "imagens/guarana-2l.png"
    },
    {
        nome: "Sprite 2L",
        descricao: "Sprite 2L.",
        preco: "R$ 13,00",
        imagem: "imagens/sprite-2l.png"
    },
    {
        nome: "Água sem Gás",
        descricao: "Água s/ gás cristal azul 500ml.",
        preco: "R$ 3,00",
        imagem: "imagens/agua-sem-gas.png"
    },
    {
        nome: "Água com Gás",
        descricao: "Água c/ gás Font Life 500ml.",
        preco: "R$ 3,00",
        imagem: "imagens/agua-com-gas.png"
    },
    {
        nome: "Chá Matte Leão",
        descricao: "Chá matte leão orig. Copo 300ml.",
        preco: "R$ 6,00",
        imagem: "imagens/matte-leao.png"
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
        imagem: "imagens/x-burguer.jpeg"
    },
    {
        nome: "X-Salada",
        descricao: "Pão, maionese, 90g de hambúrguer caseiro, mussarela, presunto, alface e tomate.",
        preco: "R$ 12,00",
        imagem: "imagens/x-salada.jpg"
    },
    {
        nome: "X-Egg",
        descricao: "Pão, maionese, 90g de hambúrguer caseiro, ovo, mussarela, presunto, alface e tomate.",
        preco: "R$ 15,00",
        imagem: "imagens/x-egg.jpeg"
    },
    {
        nome: "X-Calabresa",
        descricao: "Pão, maionese, 90g de hambúrguer caseiro, calabresa, mussarela, presunto, alface e tomate.",
        preco: "R$ 15,00",
        imagem: "imagens/x-calabresa.jpeg"
    },
    {
        nome: "X-Frango",
        descricao: "Pão, maionese, 90g de filé de frango, mussarela, catupiry, alface e tomate.",
        preco: "R$ 15,00",
        imagem: "imagens/x-frango.jpeg"
    },
    {
        nome: "X-Bacon",
        descricao: "Pão, maionese, 90g de hambúrguer caseiro, Bacon mussarela, presunto, alface e tomate.",
        preco: "R$ 15,00",
        imagem: "imagens/x-bacon.jpeg"
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
// 2. CONFIGURAÇÃO GERAL E LÓGICA
// ==========================================================================

const numeroWhats = "5541997373544"; // Número oficial da Confeitaria Norske!

// Função reutilizável que desenha os produtos na tela
function renderizarProdutos(listaDeProdutos, idDoContainer) {
    const container = document.getElementById(idDoContainer);
    
    // Se não houver produtos na lista, exibe a mensagem de "em breve" do CSS
    if (listaDeProdutos.length === 0) return;

    listaDeProdutos.forEach(produto => {
        // Gera o link do WhatsApp com o texto já pronto e adaptado para o produto
        const linkWhats = `https://wa.me/${numeroWhats}?text=Olá!%20Gostaria%20de%20pedir%20o%20${encodeURIComponent(produto.nome)}`;

        // Monta a estrutura HTML do card
        const cardHTML = `
            <div class="card-produto">
                <img src="${produto.imagem}" alt="${produto.nome}" class="img-produto">
                <div class="detalhes-produto">
                    <h3>${produto.nome}</h3>
                    <p class="descricao">${produto.descricao}</p>
                    <p class="preco">${produto.preco}</p>
                    <a href="${linkWhats}" class="btn-whatsapp" target="_blank">Pedir no WhatsApp</a>
                </div>
            </div>
        `;
        
        // Injeta o card dentro do container correto
        container.innerHTML += cardHTML;
    });
}

// Executa a função para cada uma das categorias quando a página carrega
renderizarProdutos(doces, 'lista-doces');
renderizarProdutos(salgados, 'lista-salgados');
renderizarProdutos(bebidas, 'lista-bebidas');
renderizarProdutos(hamburgueres, 'lista-hamburgueres');