// Funções específicas da página de detalhes do produto

// Trocar imagem principal
function changeImage(thumbnail) {
    const mainImage = document.getElementById('mainProductImage');
    mainImage.src = thumbnail.src;
    
    // Remove active de todas as thumbnails
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    
    // Adiciona active na thumbnail clicada
    thumbnail.classList.add('active');
}

// Aumentar quantidade
function increaseQty() {
    const qtyInput = document.getElementById('quantity');
    let currentValue = parseInt(qtyInput.value);
    if (currentValue < 99) {
        qtyInput.value = currentValue + 1;
    }
}

// Diminuir quantidade
function decreaseQty() {
    const qtyInput = document.getElementById('quantity');
    let currentValue = parseInt(qtyInput.value);
    if (currentValue > 1) {
        qtyInput.value = currentValue - 1;
    }
}

// Adicionar ao carrinho da página de detalhes
function addToCartFromDetail() {
    const productName = document.getElementById('productTitle').textContent;
    const priceText = document.querySelector('.product-price-large').textContent;
    const price = parseFloat(priceText.replace('R$', '').replace(',', '.').trim());
    const image = document.getElementById('mainProductImage').src;
    const quantity = parseInt(document.getElementById('quantity').value);
    
    // Adiciona a quantidade especificada
    for (let i = 0; i < quantity; i++) {
        addToCart({ name: productName, price: price, image: image });
    }
    
    // Feedback visual
    const btn = document.querySelector('.btn-add-cart-large');
    btn.style.transform = 'scale(0.95)';
    btn.textContent = '✓ Adicionado!';
    
    setTimeout(() => {
        btn.style.transform = '';
        btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
            </svg>
            Adicionar ao Carrinho
        `;
    }, 2000);
}

// Toggle favorito na página de detalhes
function toggleFavoriteDetail() {
    const productName = document.getElementById('productTitle').textContent;
    const priceText = document.querySelector('.product-price-large').textContent;
    const price = parseFloat(priceText.replace('R$', '').replace(',', '.').trim());
    const image = document.getElementById('mainProductImage').src;
    
    const btn = document.querySelector('.btn-favorite-large');
    const isFavorited = favoriteItems.some(item => item.name === productName);
    
    if (isFavorited) {
        removeFromFavorites(productName);
        btn.style.background = 'white';
        btn.style.color = '#6b4654';
        btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            Favoritar
        `;
    } else {
        addToFavorites({ name: productName, price: price, image: image });
        btn.style.background = '#e91e63';
        btn.style.color = 'white';
        btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            Favoritado
        `;
    }
}

// Máscara para CEP
document.addEventListener('DOMContentLoaded', () => {
    const cepInput = document.querySelector('.cep-calculator input');
    if (cepInput) {
        cepInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 5) {
                value = value.slice(0, 5) + '-' + value.slice(5, 8);
            }
            e.target.value = value;
        });
    }
});
