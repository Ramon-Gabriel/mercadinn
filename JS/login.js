const botao = document.getElementById('btnLogin');

botao.addEventListener('click', () => {
    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;

    const usuarioSalvo = JSON.parse(localStorage.getItem("usuarioCadastrado"));

    if (!usuarioSalvo) {
        alert("Nenhum usuário cadastrado. Cadastre-se primeiro.");
        return;
    }

    if (login === usuarioSalvo.login && senha === usuarioSalvo.senha) {
        window.location.href = "home.html";
    } else {
        alert("Usuário ou senha inválidos.");
    }
});
