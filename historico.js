// ✨ Histórico de Pedidos ✨
// Aqui a cliente consegue ver todos os pedidos dela!

// Histórico de pedidos ♡
const ordersData = {
    '12345': {
        number: '12345',
        date: '15/11/2024',
        status: 'Entregue',
        items: [
            { name: 'Cílios Volume 4D - Beauty Start', qty: 2, price: 39.90, image: 'images/produtos/cilios4d.png' }
        ],
        shipping: 15.00,
        payment: 'Cartão de Crédito',
        address: 'Rua das Flores, 123 - São Paulo, SP'
    },
    '12344': {
        number: '12344',
        date: '10/11/2024',
        status: 'Em Trânsito',
        items: [
            { name: 'Cola Beauty Eyes Pro', qty: 1, price: 89.90, image: 'images/produtos/cola.png' }
        ],
        shipping: 15.00,
        payment: 'PIX',
        address: 'Rua das Flores, 123 - São Paulo, SP'
    },
    '12343': {
        number: '12343',
        date: '05/11/2024',
        status: 'Entregue',
        items: [
            { name: 'Kit Iniciante Completo', qty: 1, price: 199.90, image: 'images/extensao.png' }
        ],
        shipping: 0,
        payment: 'Boleto',
        address: 'Rua das Flores, 123 - São Paulo, SP'
    }
};

function showOrderDetails(orderNumber) {
    const order = ordersData[orderNumber];
    if (!order) return;

    const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const total = subtotal + order.shipping;

    const content = `
        <div class="order-details-content">
            <div class="order-detail-section">
                <h3>Pedido #${order.number}</h3>
                <p>Data: ${order.date}</p>
                <p>Status: <span class="order-status ${order.status === 'Entregue' ? 'status-delivered' : 'status-transit'}">${order.status}</span></p>
            </div>

            <div class="order-detail-section">
                <h3>Produtos</h3>
                ${order.items.map(item => `
                    <div class="order-detail-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div>
                            <p><strong>${item.name}</strong></p>
                            <p>Quantidade: ${item.qty}</p>
                            <p>Preço: R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="order-detail-section">
                <h3>Pagamento</h3>
                <p>Forma de pagamento: ${order.payment}</p>
                <p>Subtotal: R$ ${subtotal.toFixed(2).replace('.', ',')}</p>
                <p>Frete: R$ ${order.shipping.toFixed(2).replace('.', ',')}</p>
                <p><strong>Total: R$ ${total.toFixed(2).replace('.', ',')}</strong></p>
            </div>

            <div class="order-detail-section">
                <h3>Endereço de Entrega</h3>
                <p>${order.address}</p>
            </div>
        </div>
    `;

    document.getElementById('orderDetailsContent').innerHTML = content;
    document.getElementById('orderDetailsOverlay').classList.add('active');
    document.getElementById('orderDetailsPopup').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Fecha os detalhes do pedido
function closeOrderDetails() {
    document.getElementById('orderDetailsOverlay').classList.remove('active');
    document.getElementById('orderDetailsPopup').classList.remove('active');
    document.body.style.overflow = 'auto';
}
