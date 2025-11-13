// ✨ Página de Detalhes do Produto ✨
// Aqui tem todas as funções pra deixar a página de produto linda e funcional!

// Troca a imagem principal quando clica nas miniaturas
function changeImage(thumbnail) {
    const mainImage = document.getElementById('mainProductImage');
    mainImage.src = thumbnail.src;
    
    // Tira o destaque de todas as miniaturas
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    
    // Destaca a miniatura clicada
    thumbnail.classList.add('active');
}

// Aumenta a quantidade
function increaseQty() {
    const qtyInput = document.getElementById('quantity');
    let currentValue = parseInt(qtyInput.value);
    if (currentValue < 99) {
        qtyInput.value = currentValue + 1;
    }
}

// Diminui a quantidade
function decreaseQty() {
    const qtyInput = document.getElementById('quantity');
    let currentValue = parseInt(qtyInput.value);
    if (currentValue > 1) {
        qtyInput.value = currentValue - 1;
    }
}

// Adiciona o produto no carrinho
function addToCartFromDetail() {
    const productName = document.getElementById('productTitle').textContent;
    const priceText = document.querySelector('.product-price-large').textContent;
    const price = parseFloat(priceText.replace('R$', '').replace(',', '.').trim());
    const image = document.getElementById('mainProductImage').src;
    const quantity = parseInt(document.getElementById('quantity').value);
    
    // Vê se já tem esse produto no carrinho
    const existingItem = cartItems.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + quantity;
    } else {
        cartItems.push({ 
            name: productName, 
            price: price, 
            image: image,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateBadges();
    
    // Mostra que foi adicionado
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

// Comprar agora - já vai direto pro pagamento
function buyNow() {
    const productName = document.getElementById('productTitle').textContent;
    const priceText = document.querySelector('.product-price-large').textContent;
    const price = parseFloat(priceText.replace('R$', '').replace(',', '.').trim());
    const image = document.getElementById('mainProductImage').src;
    const quantity = parseInt(document.getElementById('quantity').value);
    
    // Adiciona no carrinho
    const existingItem = cartItems.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + quantity;
    } else {
        cartItems.push({ 
            name: productName, 
            price: price, 
            image: image,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Vai pra página de pagamento
    window.location.href = 'pagamento.html';
}

// Favorita ou desfavorita o produto
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
        addToFavorites({ name: productName, price: price, image: image, quantity: 1 });
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

// Calcula o frete
function calculateShipping() {
    const cepInput = document.querySelector('.cep-calculator input');
    const resultDiv = document.querySelector('.shipping-result');
    
    if (!cepInput || !cepInput.value) {
        alert('Por favor, digite um CEP válido!');
        return;
    }
    
    const cep = cepInput.value.replace(/\D/g, '');
    
    if (cep.length !== 8) {
        alert('CEP inválido! Digite um CEP com 8 dígitos.');
        return;
    }
    
    // Simula cálculo de frete
    const btn = document.querySelector('.cep-calculator button');
    btn.textContent = 'Calculando...';
    btn.disabled = true;
    
    setTimeout(() => {
        // Valores simulados baseados no CEP
        const freteNormal = (Math.random() * 20 + 10).toFixed(2);
        const freteExpresso = (Math.random() * 30 + 25).toFixed(2);
        const diasNormal = Math.floor(Math.random() * 5 + 5);
        const diasExpresso = Math.floor(Math.random() * 2 + 2);
        
        if (!resultDiv) {
            const newResultDiv = document.createElement('div');
            newResultDiv.className = 'shipping-result';
            newResultDiv.innerHTML = `
                <div class="shipping-option">
                    <div>
                        <strong>📦 Frete Normal</strong>
                        <p>Entrega em ${diasNormal} dias úteis</p>
                    </div>
                    <span class="shipping-price">R$ ${freteNormal.replace('.', ',')}</span>
                </div>
                <div class="shipping-option">
                    <div>
                        <strong>🚀 Frete Expresso</strong>
                        <p>Entrega em ${diasExpresso} dias úteis</p>
                    </div>
                    <span class="shipping-price">R$ ${freteExpresso.replace('.', ',')}</span>
                </div>
            `;
            document.querySelector('.cep-calculator').appendChild(newResultDiv);
        } else {
            resultDiv.innerHTML = `
                <div class="shipping-option">
                    <div>
                        <strong>📦 Frete Normal</strong>
                        <p>Entrega em ${diasNormal} dias úteis</p>
                    </div>
                    <span class="shipping-price">R$ ${freteNormal.replace('.', ',')}</span>
                </div>
                <div class="shipping-option">
                    <div>
                        <strong>🚀 Frete Expresso</strong>
                        <p>Entrega em ${diasExpresso} dias úteis</p>
                    </div>
                    <span class="shipping-price">R$ ${freteExpresso.replace('.', ',')}</span>
                </div>
            `;
        }
        
        btn.textContent = 'Calcular Frete';
        btn.disabled = false;
    }, 1500);
}

// Coloca a máscara no CEP
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
        
        // Permite calcular frete ao pressionar Enter
        cepInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                calculateShipping();
            }
        });
    }
});
