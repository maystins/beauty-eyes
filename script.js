const cartBtn = document.getElementById('cartBtn');
const userBtn = document.getElementById('userBtn');

const cartOverlay = document.getElementById('cartOverlay');
const userOverlay = document.getElementById('userOverlay');

const cartPopup = document.getElementById('cartPopup');
const userPopup = document.getElementById('userPopup');

const closeCart = document.getElementById('closeCart');
const closeUser = document.getElementById('closeUser');

// abrir carrinho
cartBtn.onclick = () => {
  cartOverlay.classList.add('active');
  cartPopup.classList.add('active');
  document.body.style.overflow = 'hidden';
};

// abrir usuário
userBtn.onclick = () => {
  userOverlay.classList.add('active');
  userPopup.classList.add('active');
  document.body.style.overflow = 'hidden';
};

// fechar carrinho
closeCart.onclick = () => {
  cartOverlay.classList.remove('active');
  cartPopup.classList.remove('active');
  document.body.style.overflow = 'auto';
};

// fechar usuário
closeUser.onclick = () => {
  userOverlay.classList.remove('active');
  userPopup.classList.remove('active');
  document.body.style.overflow = 'auto';
};

// fechar clicando fora
cartOverlay.onclick = e => {
  if (e.target === cartOverlay) {
    cartOverlay.classList.remove('active');
    cartPopup.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
};

userOverlay.onclick = e => {
  if (e.target === userOverlay) {
    userOverlay.classList.remove('active');
    userPopup.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
};
let isLoggedIn = true; // mudar p true pra testar estado logado

const notLoggedContent = document.getElementById('notLoggedContent');
const loggedContent = document.getElementById('loggedContent');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');

// Função para atualizar a interface
function updateUserInterface() {
    if (isLoggedIn) {
        notLoggedContent.style.display = 'none';
        loggedContent.style.display = 'block';
    } else {
        notLoggedContent.style.display = 'block';
        loggedContent.style.display = 'none';
    }
}

// Simular login 
if (loginBtn) {
    loginBtn.onclick = (e) => {
        e.preventDefault();
        isLoggedIn = true;
        updateUserInterface();
        userOverlay.classList.remove('active');
        userPopup.classList.remove('active');
        document.body.style.overflow = 'auto';
    };
}

// logout
if (logoutBtn) {
    logoutBtn.onclick = (e) => {
        e.preventDefault();
        isLoggedIn = false;
        updateUserInterface();
    };
}

// atualiza interface ao abrir o popup
userBtn.onclick = () => {
    updateUserInterface(); // Verifica o estado antes de abrir
    userOverlay.classList.add('active');
    userPopup.classList.add('active');
    document.body.style.overflow = 'hidden';
};
// contador do carrinho
let cartCount = 0;
const cartBadge = document.getElementById('cartBadge');
const favoriteButtons = document.querySelectorAll('.favorite-btn');

// função para atualizar o badge
function updateCartBadge() {
    cartBadge.textContent = cartCount;
    
    if (cartCount > 0) {
        cartBadge.classList.add('show');
        cartBadge.classList.add('animate');
        
        setTimeout(() => {
            cartBadge.classList.remove('animate');
        }, 500);
    } else {
        cartBadge.classList.remove('show');
    }
}

// evento de botao de favorito
favoriteButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // muda o coração de vazio para cheio
        if (button.textContent === '♡') {
            button.textContent = '♥';
            button.style.color = '#e91e63';
            cartCount++;
        } else {
            button.textContent = '♡';
            button.style.color = '';
            cartCount--;
        }
        
        updateCartBadge();
    });
});
// busca de produtos
const searchInput = document.querySelector('.search-bar input');
const searchIcon = document.querySelector('.search-icon');

// buscar ao clicar no ícone
if (searchIcon) {
    searchIcon.addEventListener('click', () => {
        performSearch();
    });
}

// buscar ao pressionar enter
if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function performSearch() {
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm) {
        // redireciona para página de produtos com o termo de busca
        window.location.href = `produtos.html?busca=${encodeURIComponent(searchTerm)}`;
    }
}
function renderizarProdutos(produtos) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';

    if (produtos.length === 0) {
        grid.innerHTML = '<p class="no-results">Nenhum produto encontrado 😢</p>';
        return;
    }

    produtos.forEach(produto => {
        const card = `
            <div class="product-card">
                <div class="product-image-wrapper">
                    <button class="favorite-btn">♡</button>
                    <img src="${produto.imagem}" alt="${produto.nome}">
                </div>
                <div class="product-info">
                    <h3>${produto.nome}</h3>
                    <p>${produto.descricao}</p>
                    <div class="price">R$ ${produto.preco.toFixed(2)}</div>
                </div>
            </div>
        `;
        grid.innerHTML += card;
    });

    // Reaplica os event listeners dos corações
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            if (button.textContent === '♡') {
                button.textContent = '♥';
                button.style.color = '#e91e63';
                cartCount++;
            } else {
                button.textContent = '♡';
                button.style.color = '';
                cartCount--;
            }
            updateCartBadge();
        });
    });
}

// Filtrar produtos baseado na busca ou categoria
let produtosFiltrados = todosOsProdutos;

if (searchTerm) {
    produtosFiltrados = todosOsProdutos.filter(produto => 
        produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        produto.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );
    document.getElementById('pageTitle').textContent = `Resultados para "${searchTerm}"`;
    document.getElementById('searchResults').textContent = `${produtosFiltrados.length} produto(s) encontrado(s)`;
}

if (categoria) {
    produtosFiltrados = todosOsProdutos.filter(produto => 
        produto.categoria === categoria
    );
    document.getElementById('pageTitle').textContent = categoria.toUpperCase();
}

// Renderizar produtos
renderizarProdutos(produtosFiltrados);

// Busca na página de produtos
const searchInputProducts = document.getElementById('searchInputProducts');
const searchIconProducts = document.querySelector('.search-icon');

if (searchIconProducts) {
    searchIconProducts.addEventListener('click', () => {
        const term = searchInputProducts.value.trim();
        if (term) {
            window.location.href = `produtos.html?busca=${encodeURIComponent(term)}`;
        }
    });
}

if (searchInputProducts) {
    searchInputProducts.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const term = searchInputProducts.value.trim();
            if (term) {
                window.location.href = `produtos.html?busca=${encodeURIComponent(term)}`;
            }
        }
    });
}
const urlParams = new URLSearchParams(window.location.search);
const searchTerm = urlParams.get('busca');
const categoria = urlParams.get('categoria');

const todosOsProdutos = [    {
        id: 1,
        nome: "Cílios Volume 4D - Beauty Start",
        descricao: "Espessura 0.07",
        preco: 39.90,
        imagem: "images/cilios4d.png",
        categoria: "cilios"
    },
    {
        id: 2,
        nome: "Cílios Curvatura Brasileiro Y",
        descricao: "Curvatura L - Mix de fios",
        preco: 34.90,
        imagem: "images/wispy.png",
        categoria: "cilios"
    },
    {
        id: 3,
        nome: "Sensual Lash",
        descricao: "Curvatura L e M - 0.07",
        preco: 15.00,
        imagem: "images/sensualcilios.png",
        categoria: "cilios"
    } ]