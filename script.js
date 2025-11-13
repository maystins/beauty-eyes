// Guardando os produtos no carrinho e favoritos ♡
let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
let favoriteItems = JSON.parse(localStorage.getItem('favoriteItems') || '[]');

// Elementos da página - vou pegar eles quando carregar tudo
let cartBtn, favoritesBtn, userBtn;
let cartOverlay, favoritesOverlay, userOverlay;
let cartPopup, favoritesPopup, userPopup;
let closeCart, closeFavorites, closeUser;
let cartBadge, favoritesBadge;

// Abre aqueles popups bonitinhos
function openPopup(overlay, popup) {
    overlay.classList.add('active');
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Fecha os popups
function closePopup(overlay, popup) {
    overlay.classList.remove('active');
    popup.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Controle de login da usuária
let isLoggedIn = false;
let notLoggedContent, loggedContent, loginBtn, logoutBtn;

function updateUserInterface() {
    if (isLoggedIn) {
        if (notLoggedContent) notLoggedContent.style.display = 'none';
        if (loggedContent) loggedContent.style.display = 'block';
    } else {
        if (notLoggedContent) notLoggedContent.style.display = 'block';
        if (loggedContent) loggedContent.style.display = 'none';
    }
}

// Atualiza aqueles numerozinhos nos ícones
function updateBadges() {
    if (cartBadge) {
        const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
        cartBadge.textContent = totalItems;
        if (totalItems > 0) {
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

// Adiciona produto no carrinho ♡
function addToCart(productData) {
    // Vê se já tem esse produto no carrinho
    const existingItem = cartItems.find(item => item.name === productData.name);
    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        productData.quantity = 1;
        cartItems.push(productData);
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateBadges();
    renderCart();
}

// Remove produto do carrinho
function removeFromCart(productName) {
    cartItems = cartItems.filter(item => item.name !== productName);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateBadges();
    renderCart();
}

// Aumenta a quantidade do produto
function increaseQuantity(productName) {
    const item = cartItems.find(item => item.name === productName);
    if (item) {
        item.quantity = (item.quantity || 1) + 1;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateBadges();
        renderCart();
    }
}

// Diminui a quantidade do produto
function decreaseQuantity(productName) {
    const item = cartItems.find(item => item.name === productName);
    if (item) {
        if (item.quantity > 1) {
            item.quantity--;
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateBadges();
            renderCart();
        } else {
            removeFromCart(productName);
        }
    }
}

// Adiciona nos favoritos ♥
function addToFavorites(productData) {
    const exists = favoriteItems.find(item => item.name === productData.name);
    if (!exists) {
        favoriteItems.push(productData);
        localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
        updateBadges();
        renderFavorites();
    }
}

// Remove dos favoritos
function removeFromFavorites(productName) {
    favoriteItems = favoriteItems.filter(item => item.name !== productName);
    localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
    updateBadges();
    renderFavorites();
    
    // Atualiza o coraçãozinho no card
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

// Mostra os produtos no carrinho
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
    cartItemsContainer.innerHTML = cartItems.map((item, index) => {
        const quantity = item.quantity || 1;
        const itemTotal = item.price * quantity;
        total += itemTotal;
        const escapedName = item.name.replace(/'/g, "\\'");
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="decreaseQuantity('${escapedName}')">-</button>
                        <span class="quantity-display">${quantity}</span>
                        <button class="quantity-btn" onclick="increaseQuantity('${escapedName}')">+</button>
                    </div>
                </div>
                <button class="remove-item-btn" onclick="removeFromCart('${escapedName}')">✕</button>
            </div>
        `;
    }).join('');

    if (cartTotalElement) {
        cartTotalElement.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

// Mostra os favoritos
function renderFavorites() {
    const favoritesItemsContainer = document.getElementById('favoritesItems');
    
    if (!favoritesItemsContainer) return;

    if (favoriteItems.length === 0) {
        favoritesItemsContainer.innerHTML = '<p class="empty-message">Nenhum favorito ainda</p>';
        return;
    }

    favoritesItemsContainer.innerHTML = favoriteItems.map(item => {
        const escapedName = item.name.replace(/'/g, "\\'");
        return `
        <div class="cart-item favorite-item" data-product-name="${item.name}">
            <img src="${item.image}" alt="${item.name}">
            <button class="remove-item-btn" onclick="removeFromFavorites('${escapedName}')">✕</button>
            <div class="product-tooltip">${item.name}</div>
        </div>
    `;
    }).join('');
}

// Pega as informações do produto
function getProductData(productCard) {
    const nameElement = productCard.querySelector('h3');
    const priceElement = productCard.querySelector('.price');
    const imageElement = productCard.querySelector('img');
    
    if (!nameElement || !priceElement || !imageElement) {
        console.error('Ops! Não achei os elementos do card:', productCard);
        return null;
    }
    
    const name = nameElement.textContent;
    const priceText = priceElement.textContent;
    const price = parseFloat(priceText.replace('R$', '').replace(',', '.').trim());
    const image = imageElement.src;
    
    return { name, price, image, quantity: 1 };
}

// Filtra os produtos por categoria
function filterProducts(category) {
    const productCards = document.querySelectorAll('.product-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Atualiza os botõezinhos ativos
    filterButtons.forEach(btn => {
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Filtra os produtos
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

// Quando a página carregar, configura tudo ♡
document.addEventListener('DOMContentLoaded', () => {
    // Pega todos os elementos da página
    cartBtn = document.getElementById('cartBtn');
    favoritesBtn = document.getElementById('favoritesBtn');
    userBtn = document.getElementById('userBtn');
    
    cartOverlay = document.getElementById('cartOverlay');
    favoritesOverlay = document.getElementById('favoritesOverlay');
    userOverlay = document.getElementById('userOverlay');
    
    cartPopup = document.getElementById('cartPopup');
    favoritesPopup = document.getElementById('favoritesPopup');
    userPopup = document.getElementById('userPopup');
    
    closeCart = document.getElementById('closeCart');
    closeFavorites = document.getElementById('closeFavorites');
    closeUser = document.getElementById('closeUser');
    
    cartBadge = document.getElementById('cartBadge');
    favoritesBadge = document.getElementById('favoritesBadge');
    
    // Pega os elementos de login
    notLoggedContent = document.getElementById('notLoggedContent');
    loggedContent = document.getElementById('loggedContent');
    loginBtn = document.getElementById('loginBtn');
    logoutBtn = document.getElementById('logoutBtn');
    
    // Configura os botões de login
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
    
    // Configura event listeners dos popups
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
            
            if (productData) {
                addToCart(productData);
                
                // Animação de feedback
                button.style.transform = 'scale(0.8)';
                setTimeout(() => button.style.transform = '', 200);
                
                productCard.style.transform = 'scale(1.05)';
                setTimeout(() => productCard.style.transform = '', 300);
            }
        });
    });
    
    // Botões de favorito
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    favoriteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const productCard = button.closest('.product-card');
            const productData = getProductData(productCard);
            
            if (productData) {
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
    favoriteButtons.forEach((button, btnIndex) => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const card = button.closest('.product-card');
            const productName = card.querySelector('h3').textContent;
            const priceText = card.querySelector('.price').textContent;
            const price = parseFloat(priceText.replace('R$', '').replace(',', '.').trim());
            const image = card.querySelector('img').src;
            
            if (button.textContent === '♡') {
                button.textContent = '♥';
                button.style.color = '#e91e63';
                addToFavorites({ name: productName, price: price, image: image, quantity: 1 });
                
                // Animação de pulso
                button.style.animation = 'pulse 0.5s ease';
                setTimeout(() => {
                    button.style.animation = '';
                }, 500);
            } else {
                button.textContent = '♡';
                button.style.color = '';
                removeFromFavorites(productName);
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
