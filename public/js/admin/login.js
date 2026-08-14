// ==========================================================================
// LOGIN — ENTRADA DA PÁGINA DE LOGIN DO PAINEL
// ==========================================================================

import { entrar, sair, observarSessao, redirecionarPara, usuarioEhAdministrador } from "./auth.js";

const formulario = document.getElementById("form-login");
const campoEmail = document.getElementById("campo-email");
const campoSenha = document.getElementById("campo-senha");
const campoErro = document.getElementById("erro-login");
const botaoEntrar = document.getElementById("botao-entrar");

// Sessão anterior encerrada por acesso negado (redirect vindo do painel)
if (new URLSearchParams(window.location.search).get("acesso") === "negado") {
    campoErro.textContent = "Acesso negado: esta conta não possui permissão para o painel.";
}

// Quem já está autenticado como administrador vai direto para o painel
observarSessao(usuario => {
    if (usuario && usuarioEhAdministrador(usuario)) {
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
        const credencial = await entrar(email, senha);

        if (!usuarioEhAdministrador(credencial.user)) {
            await sair();
            campoErro.textContent = "Esta conta não possui acesso ao painel administrativo.";
            return;
        }

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