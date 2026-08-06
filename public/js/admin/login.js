// ==========================================================================
// LOGIN — ENTRADA DA PÁGINA DE LOGIN DO PAINEL
// ==========================================================================

import { entrar, observarSessao, redirecionarPara } from "./auth.js";

const formulario = document.getElementById("form-login");
const campoEmail = document.getElementById("campo-email");
const campoSenha = document.getElementById("campo-senha");
const campoErro = document.getElementById("erro-login");
const botaoEntrar = document.getElementById("botao-entrar");

// Quem já está autenticado vai direto para o painel
observarSessao(usuario => {
    if (usuario) {
        redirecionarPara("/admin/index.html");
    }
});

formulario.addEventListener("submit", async evento => {
    evento.preventDefault();

    const email = campoEmail.value.trim();
    const senha = campoSenha.value;

    if (!email || !senha) {
        campoErro.textContent = "Informe e-mail e senha.";
        return;
    }

    campoErro.textContent = "";
    botaoEntrar.disabled = true;
    botaoEntrar.textContent = "Entrando...";

    try {
        await entrar(email, senha);
        redirecionarPara("/admin/index.html");
    } catch (erro) {
        console.error("Falha no login:", erro);

        const mensagens = {
            "auth/invalid-email": "E-mail inválido.",
            "auth/user-disabled": "Este usuário está desativado.",
            "auth/user-not-found": "Usuário não encontrado.",
            "auth/wrong-password": "Senha incorreta.",
            "auth/invalid-credential": "E-mail ou senha incorretos.",
            "auth/too-many-requests": "Muitas tentativas. Aguarde e tente novamente."
        };

        campoErro.textContent =
            mensagens[erro.code] || "Não foi possível entrar. Tente novamente.";
    } finally {
        botaoEntrar.disabled = false;
        botaoEntrar.textContent = "Entrar";
    }
});