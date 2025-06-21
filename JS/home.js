const container = document.getElementById('produtos');
const listaCarrinho = document.getElementById('itens-carrinho');
const totalSpan = document.getElementById('total');
const painelCarrinho = document.getElementById('painelCarrinho');
const btnAbrirCarrinho = document.getElementById('abrirCarrinho');
const btnFecharCarrinho = document.getElementById('fecharCarrinho');
const btnUsuario = document.getElementById('btnUsuario');

let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
let produtosCarregados = [];

// Exibir produtos da API
function exibirProdutos() {
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(produtos => {
      produtosCarregados = produtos;
      produtos.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'produto';
        card.innerHTML = `
          <img src="${produto.image}" alt="${produto.title}">
          <h3>${produto.title}</h3>
          <p>${produto.description.slice(0, 80)}...</p>
          <p><strong>Preço: R$ ${produto.price.toFixed(2)}</strong></p>
          <button class="btn-add-carrinho" data-id="${produto.id}">Adicionar ao Carrinho</button>
        `;
        container.appendChild(card);
      });
    });
}

// Adicionar ao carrinho
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('btn-add-carrinho')) {
    const idProduto = parseInt(e.target.dataset.id);
    const produto = produtosCarregados.find(p => p.id === idProduto);
    if (produto) {
      adicionarAoCarrinho(produto);
      painelCarrinho.style.display = 'block';
    }
  }
});

function adicionarAoCarrinho(produto) {
  carrinho.push(produto);
  salvarCarrinho();
  atualizarCarrinho();
}

function atualizarCarrinho() {
  listaCarrinho.innerHTML = '';
  let total = 0;

  carrinho.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.title} - R$ ${item.price.toFixed(2)}
      <button onclick="removerItem(${index})">Remover</button>
    `;
    listaCarrinho.appendChild(li);
    total += item.price;
  });

  totalSpan.textContent = total.toFixed(2);
}

function removerItem(index) {
  carrinho.splice(index, 1);
  salvarCarrinho();
  atualizarCarrinho();
}

function salvarCarrinho() {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  alert("Compra realizada com sucesso!");
  carrinho = [];
  salvarCarrinho();
  atualizarCarrinho();
  painelCarrinho.style.display = 'none';
}

// Abrir/Fechar carrinho
btnAbrirCarrinho.addEventListener('click', () => {
  painelCarrinho.style.display = painelCarrinho.style.display === 'block' ? 'none' : 'block';
});
btnFecharCarrinho.addEventListener('click', () => {
  painelCarrinho.style.display = 'none';
});

// Exibir inicial do usuário
function carregarUsuario() {
  const usuarioSalvo = JSON.parse(localStorage.getItem('usuarioCadastrado'));
  if (usuarioSalvo && usuarioSalvo.login) {
    btnUsuario.textContent = usuarioSalvo.login.charAt(0).toUpperCase();
  } else {
    btnUsuario.style.display = 'none';
  }
}

// Painel do usuário
let painelUsuario = document.getElementById('painelUsuario');
if (!painelUsuario) {
  painelUsuario = document.createElement('div');
  painelUsuario.id = 'painelUsuario';
  document.body.appendChild(painelUsuario);
}

btnUsuario.addEventListener('click', () => {
  const usuarioSalvo = JSON.parse(localStorage.getItem('usuarioCadastrado'));

  if (painelUsuario.style.display === 'block') {
    painelUsuario.style.display = 'none';
  } else {
    painelUsuario.innerHTML = `
      <h5>Usuário Logado</h5>
      <p><strong>${usuarioSalvo.login}</strong></p>
      <button id="btnFecharUsuario" class="btn btn-outline-light w-100 mb-2">Fechar</button>
      <button id="btnSair" class="btn btn-danger w-100">Sair</button>
    `;
    painelUsuario.style.display = 'block';

    document.getElementById('btnFecharUsuario').addEventListener('click', () => {
      painelUsuario.style.display = 'none';
    });

    document.getElementById('btnSair').addEventListener('click', () => {
      localStorage.removeItem("usuarioCadastrado");
      window.location.href = "cadastro.html";
    });

    painelCarrinho.style.display = 'none';
  }
});

// Inicialização
carregarUsuario();
exibirProdutos();
atualizarCarrinho();
