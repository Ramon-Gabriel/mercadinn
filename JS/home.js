const container = document.getElementById('produtos');
const listaCarrinho = document.getElementById('itens-carrinho');
const totalSpan = document.getElementById('total');
const painelCarrinho = document.getElementById('painelCarrinho');
const btnAbrirCarrinho = document.getElementById('abrirCarrinho');
const btnFecharCarrinho = document.getElementById('fecharCarrinho');
const btnUsuario = document.getElementById('btnUsuario');

let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
let produtosCarregados = [];

// ==============================
// EXIBIR PRODUTOS
// ==============================
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

// ==============================
// EVENTO - ADICIONAR AO CARRINHO
// ==============================
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

// ==============================
// FUNÇÕES DO CARRINHO
// ==============================
function adicionarAoCarrinho(produto) {
  carrinho.push(produto);
  salvarCarrinho();
  atualizarCarrinho();
}

function removerItem(index) {
  carrinho.splice(index, 1);
  salvarCarrinho();
  atualizarCarrinho();
}

function salvarCarrinho() {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
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

// ==============================
// EVENTOS - ABRIR/FECHAR CARRINHO
// ==============================
btnAbrirCarrinho.addEventListener('click', () => {
  painelCarrinho.style.display = painelCarrinho.style.display === 'block' ? 'none' : 'block';
});
btnFecharCarrinho.addEventListener('click', () => {
  painelCarrinho.style.display = 'none';
});

// ==============================
// USUÁRIO - EXIBIR INICIAL
// ==============================
function carregarUsuario() {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
  if (usuarioLogado && usuarioLogado.login) {
    btnUsuario.textContent = usuarioLogado.login.charAt(0).toUpperCase();
  } else {
    btnUsuario.style.display = 'none';
  }
}

// ==============================
// PAINEL DO USUÁRIO
// ==============================
let painelUsuario = document.getElementById('painelUsuario');
if (!painelUsuario) {
  painelUsuario = document.createElement('div');
  painelUsuario.id = 'painelUsuario';
  document.body.appendChild(painelUsuario);
}

btnUsuario.addEventListener('click', () => {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

  if (!usuarioLogado) {
    alert("Nenhum usuário logado.");
    return;
  }

  if (painelUsuario.style.display === 'block') {
    painelUsuario.style.display = 'none';
  } else {
    painelUsuario.innerHTML = `
      <h5>Usuário Logado</h5>
      <p><strong>${usuarioLogado.login}</strong></p>
      <button id="btnFecharUsuario" class="btn btn-outline-light w-100 mb-2">Fechar</button>
      <button id="btnSair" class="btn btn-danger w-100">Sair</button>
    `;
    painelUsuario.style.display = 'block';

    document.getElementById('btnFecharUsuario').addEventListener('click', () => {
      painelUsuario.style.display = 'none';
    });

    document.getElementById('btnSair').addEventListener('click', () => {
      localStorage.removeItem("usuarioLogado");
      window.location.href = "../index.html";
    });

    painelCarrinho.style.display = 'none';
  }
});

// ==============================
// INICIALIZAÇÃO
// ==============================
carregarUsuario();
exibirProdutos();
atualizarCarrinho();
