const CLOUD_NAME = "kygyifro";
const UPLOAD_PRESET = "norske_products";
const URL_UPLOAD = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
const TIPOS_ACEITOS = ["image/png", "image/jpeg", "image/webp"];

export async function enviarImagem(arquivo) {
    if (!TIPOS_ACEITOS.includes(arquivo.type)) {
        throw new Error("Formato de imagem inválido. Use PNG, JPG ou WEBP.");
    }

    const dados = new FormData();
    dados.append("file", arquivo);
    dados.append("upload_preset", UPLOAD_PRESET);

    const resposta = await fetch(URL_UPLOAD, { method: "POST", body: dados });

    let corpo = null;
    try {
        corpo = await resposta.json();
    } catch (erro) {
        corpo = null;
    }

    if (!resposta.ok || !corpo || !corpo.secure_url) {
        const mensagem = corpo && corpo.error ? corpo.error.message : `Falha no upload (HTTP ${resposta.status}).`;
        throw new Error(mensagem);
    }

    return corpo.secure_url;
}