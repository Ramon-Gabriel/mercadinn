const botao = document.getElementById('btnCadastrar');

botao.addEventListener('click', () => {
    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;

    if (!login || !senha) {
        alert("Preencha todos os campos.");
        return;
    }

    const usuario = { login, senha };

    localStorage.setItem("usuarioCadastrado", JSON.stringify(usuario));
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario)); // <-- aqui!

    alert("Usuário cadastrado com sucesso!");
    document.getElementById('login').value = '';
    document.getElementById('senha').value = '';

    window.location.href = "home.html"; // <-- redireciona para a home
});
