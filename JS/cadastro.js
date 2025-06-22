const botao = document.getElementById('btnCadastrar');

botao.addEventListener('click', () => {
    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;

    if (!login || !senha) {
        alert("Preencha todos os campos.");
        return;
    }

    // Recupera lista de usuários existentes
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verifica se o login já está cadastrado
    const usuarioExistente = usuarios.find(u => u.login === login);
    if (usuarioExistente) {
        alert("Este nome de usuário já está em uso.");
        return;
    }

    // Cria e adiciona novo usuário
    const novoUsuario = { login, senha };
    usuarios.push(novoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Salva o usuário logado
    localStorage.setItem("usuarioLogado", JSON.stringify(novoUsuario));

    alert("Usuário cadastrado com sucesso!");
    window.location.href = "HTML/home.html";
});
