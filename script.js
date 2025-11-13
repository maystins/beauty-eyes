// Arrays para armazenar produtos
let cartItems = [];
let favoriteItems = [];

// Elementos do DOM
const cartBtn = document.getElementById('cartBtn');
const favoritesBtn = document.getElementById('favoritesBtn');
const userBtn = document.getElementById('userBtn');

const cartOverlay = document.getElementById('cartOverlay');
const favoritesOverlay = document.getElementById('favoritesOverlay');
const userOverlay = document.getElementById('userOverlay');

const cartPopup = document.getElementById('cartPopup');
const favoritesPopup = document.getElementById('favoritesPopup');
const userPopup = document.getElementById('userPopup');

const closeCart = document.getElementById('closeCart');
const closeFavorites = document.getElementById('closeFavorites');
const closeUser = document.getElementById('closeUser');

const cartBadge = document.getElementById('cartBadge');
const favoritesBadge = document.getElementById('favoritesBadge');

// Função para abrir popup
function openPopup(overlay, popup) {
    overlay.classList.add('active');
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Função para fechar popup
function closePopup(overlay, popup) {
    overlay.classList.remove('active');
    popup.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event listeners para abrir popups
if (cartBtn) {
    cartBtn.onclick = () => {
        renderCart();
        openPopup(cartOverlay, cartPopup);
    };
}

if (favoritesBtn) {
    favoritesBtn.onclick = () => {
        renderFavorites();
        openPopup(favoritesOverlay, favoritesPopup);
    };
}

if (userBtn) {
    userBtn.onclick = () => {
        updateUserInterface();
        openPopup(userOverlay, userPopup);
    };
}

// Event listeners para fechar popups
if (closeCart) {
    closeCart.onclick = () => closePopup(cartOverlay, cartPopup);
}

if (closeFavorites) {
    closeFavorites.onclick = () => closePopup(favoritesOverlay, favoritesPopup);
}

if (closeUser) {
    closeUser.onclick = () => closePopup(userOverlay, userPopup);
}

// Fechar clicando fora
if (cartOverlay) {
    cartOverlay.onclick = (e) => {
        if (e.target === cartOverlay) closePopup(cartOverlay, cartPopup);
    };
}

if (favoritesOverlay) {
    favoritesOverlay.onclick = (e) => {
        if (e.target === favoritesOverlay) closePopup(favoritesOverlay, favoritesPopup);
    };
}

if (userOverlay) {
    userOverlay.onclick = (e) => {
        if (e.target === userOverlay) closePopup(userOverlay, userPopup);
    };
}

// Sistema de Login
let isLoggedIn = false;
const notLoggedContent = document.getElementById('notLoggedContent');
const loggedContent = document.getElementById('loggedContent');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');

function updateUserInterface() {
    if (isLoggedIn) {
        if (notLoggedContent) notLoggedContent.style.display = 'none';
        if (loggedContent) loggedContent.style.display = 'block';
    } else {
        if (notLoggedContent) notLoggedContent.style.display = 'block';
        if (loggedContent) loggedContent.style.display = 'none';
    }
}

if (loginBtn) {
    loginBtn.onclick = (e) => {
        e.preventDefault();
        isLoggedIn = true;
        updateUserInterface();
        closePopup(userOverlay, userPopup);
    };
}

if (logoutBtn) {
    logoutBtn.onclick = (e) => {
        e.preventDefault();
        isLoggedIn = false;
        updateUserInterface();
    };
}

// Função para atualizar badges
function updateBadges() {
    if (cartBadge) {
        cartBadge.textContent = cartItems.length;
        if (cartItems.length > 0) {
            cartBadge.classList.add('show', 'animate');
            setTimeout(() => cartBadge.classList.remove('animate'), 500);
        } else {
            cartBadge.classList.remove('show');
        }
    }

    if (favoritesBadge) {
        favoritesBadge.textContent = favoriteItems.length;
        if (favoriteItems.length > 0) {
            favoritesBadge.classList.add('show', 'animate');
            setTimeout(() => favoritesBadge.classList.remove('animate'), 500);
        } else {
            favoritesBadge.classList.remove('show');
        }
    }
}

// Função para adicionar ao carrinho
function addToCart(productData) {
    // Verifica se já existe
    const exists = cartItems.find(item => item.name === productData.name);
    if (!exists) {
        cartItems.push(productData);
        updateBadges();
        renderCart();
    }
}

// Função para remover do carrinho
function removeFromCart(productName) {
    cartItems = cartItems.filter(item => item.name !== productName);
    updateBadges();
    renderCart();
}

// Função para adicionar aos favoritos
function addToFavorites(productData) {
    const exists = favoriteItems.find(item => item.name === productData.name);
    if (!exists) {
        favoriteItems.push(productData);
        updateBadges();
        renderFavorites();
    }
}

// Função para remover dos favoritos
function removeFromFavorites(productName) {
    favoriteItems = favoriteItems.filter(item => item.name !== productName);
    updateBadges();
    renderFavorites();
    
    // Atualiza o coração no card do produto
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const cardName = card.querySelector('h3')?.textContent;
        if (cardName === productName) {
            const heartBtn = card.querySelector('.favorite-btn');
            if (heartBtn) {
                heartBtn.textContent = '♡';
                heartBtn.style.color = '';
            }
        }
    });
}

// Função para renderizar carrinho
function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    
    if (!cartItemsContainer) return;

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-message">Carrinho vazio</p>';
        if (cartTotalElement) cartTotalElement.textContent = 'R$ 0,00';
        return;
    }

    let total = 0;
    cartItemsContainer.innerHTML = cartItems.map(item => {
        total += item.price;
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <button class="remove-item-btn" onclick="removeFromCart('${item.name}')">✕</button>
            </div>
        `;
    }).join('');

    if (cartTotalElement) {
        cartTotalElement.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

// Função para renderizar favoritos
function renderFavorites() {
    const favoritesItemsContainer = document.getElementById('favoritesItems');
    
    if (!favoritesItemsContainer) return;

    if (favoriteItems.length === 0) {
        favoritesItemsContainer.innerHTML = '<p class="empty-message">Nenhum favorito ainda</p>';
        return;
    }

    favoritesItemsContainer.innerHTML = favoriteItems.map(item => `
        <div class="cart-item favorite-item" data-product-name="${item.name}">
            <img src="${item.image}" alt="${item.name}">
            <button class="remove-item-btn" onclick="removeFromFavorites('${item.name}')">✕</button>
            <div class="product-tooltip">${item.name}</div>
        </div>
    `).join('');
}

// Função para extrair dados do produto
function getProductData(productCard) {
    const name = productCard.querySelector('h3').textContent;
    const priceText = productCard.querySelector('.price').textContent;
    const price = parseFloat(priceText.replace('R$', '').replace(',', '.').trim());
    const image = productCard.querySelector('img').src;
    
    return { name, price, image };
}

// Função para filtrar produtos
function filterProducts(category) {
    const productCards = document.querySelectorAll('.product-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Atualiza botões ativos
    filterButtons.forEach(btn => {
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Filtra produtos
    productCards.forEach(card => {
        if (category === 'todos' || card.getAttribute('data-category') === category) {
            card.classList.remove('hidden');
            card.style.animation = 'none';
            setTimeout(() => card.style.animation = '', 10);
        } else {
            card.classList.add('hidden');
        }
    });
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Verifica se há categoria na URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('categoria');
    
    if (categoryParam) {
        filterProducts(categoryParam);
    }
    
    // Filtros de produtos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-category');
                filterProducts(category);
                
                // Atualiza URL sem recarregar a página
                if (category !== 'todos') {
                    window.history.pushState({}, '', `?categoria=${category}`);
                } else {
                    window.history.pushState({}, '', window.location.pathname);
                }
            });
        });
    }
    
    // Fazer cards clicáveis para ir para página de detalhes
    productCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Não redireciona se clicar no botão de favorito ou carrinho
            if (e.target.closest('.favorite-btn') || e.target.closest('.add-to-cart-btn')) {
                return;
            }
            window.location.href = 'produto.html';
        });
        
        // Adiciona cursor pointer
        card.style.cursor = 'pointer';
    });
    
    // Botões de adicionar ao carrinho
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const productCard = button.closest('.product-card');
            const productData = getProductData(productCard);
            
            addToCart(productData);
            
            // Animação de feedback
            button.style.transform = 'scale(0.8)';
            setTimeout(() => button.style.transform = '', 200);
            
            productCard.style.transform = 'scale(1.05)';
            setTimeout(() => productCard.style.transform = '', 300);
        });
    });
    
    // Botões de favorito
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    favoriteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const productCard = button.closest('.product-card');
            const productData = getProductData(productCard);
            
            if (button.textContent === '♡') {
                button.textContent = '♥';
                button.style.color = '#e91e63';
                addToFavorites(productData);
                
                button.style.animation = 'pulse 0.5s ease';
                setTimeout(() => button.style.animation = '', 500);
            } else {
                button.textContent = '♡';
                button.style.color = '';
                removeFromFavorites(productData.name);
            }
        });
    });

    // Busca de produtos
    const searchInput = document.querySelector('.search-bar input');
    const searchIcon = document.querySelector('.search-icon');

    function performSearch() {
        const searchTerm = searchInput?.value.trim();
        if (searchTerm) {
            window.location.href = `produtos.html?busca=${encodeURIComponent(searchTerm)}`;
        }
    }

    if (searchIcon) {
        searchIcon.addEventListener('click', performSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }

    // Inicializa badges
    updateBadges();
});

// Função para navegação do carrossel da home
let currentHomeIndex = 0;
const homeProducts = [
    {
        name: "Cílios Volume 4D - Beauty Start",
        description: "Espessura 0.07",
        price: "R$ 39,90",
        image: "images/produtos/cilios4d.png"
    },
    {
        name: "Cílios Curvatura Brasileiro Y",
        description: "Curvatura L - Mix de fios",
        price: "R$ 34,90",
        image: "images/produtos/wispy.png"
    },
    {
        name: "Sensual Lash",
        description: "Curvatura L e M - 0.07",
        price: "R$ 15,00",
        image: "images/produtos/sensualcilios.png"
    },
    {
        name: "Cola Beauty Eyes Pro",
        description: "Secagem rápida - 5ml",
        price: "R$ 89,90",
        image: "images/produtos/cola.png"
    },
    {
        name: "Cílios Volume Russo",
        description: "Espessura 0.05 - Ultra leve",
        price: "R$ 45,90",
        image: "images/produtos/cilios4d.png"
    }
];

function scrollHomeProducts(direction) {
    const carousel = document.getElementById('homeProductsCarousel');
    if (!carousel) return;
    
    if (direction === 'right') {
        currentHomeIndex = (currentHomeIndex + 1) % homeProducts.length;
    } else {
        currentHomeIndex = (currentHomeIndex - 1 + homeProducts.length) % homeProducts.length;
    }
    
    renderHomeCarousel();
}

function renderHomeCarousel() {
    const carousel = document.getElementById('homeProductsCarousel');
    if (!carousel) return;
    
    const prevIndex = (currentHomeIndex - 1 + homeProducts.length) % homeProducts.length;
    const nextIndex = (currentHomeIndex + 1) % homeProducts.length;
    
    const productsToShow = [
        homeProducts[prevIndex],
        homeProducts[currentHomeIndex],
        homeProducts[nextIndex]
    ];
    
    carousel.innerHTML = productsToShow.map((product, index) => `
        <div class="product-card" style="animation-delay: ${index * 0.1}s">
            <div class="product-image-wrapper">
                <button class="favorite-btn">♡</button>
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="price">${product.price}</div>
            </div>
        </div>
    `).join('');
    
    // Reaplica event listeners dos corações
    const favoriteButtons = carousel.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            if (button.textContent === '♡') {
                button.textContent = '♥';
                button.style.color = '#e91e63';
                
                // Animação de pulso
                button.style.animation = 'pulse 0.5s ease';
                setTimeout(() => {
                    button.style.animation = '';
                }, 500);
            } else {
                button.textContent = '♡';
                button.style.color = '';
            }
        });
    });
    
    // Adiciona clique nos cards para ir para página de detalhes
    const cards = carousel.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        // Apenas o card central é clicável
        if (index === 1) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.favorite-btn')) {
                    window.location.href = 'produto.html';
                }
            });
        }
    });
}

// Inicializa o carrossel da home
document.addEventListener('DOMContentLoaded', () => {
    renderHomeCarousel();
});
