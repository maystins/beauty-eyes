// ✨ Página de Pagamento ✨
// Tudo pra finalizar a compra com segurança e estilo!

// Coloca a máscara no CPF
document.addEventListener('DOMContentLoaded', () => {
    const cpfInput = document.getElementById('cpfInput');
    if (cpfInput) {
        cpfInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/(\d{3})(\d)/, '$1.$2');
                value = value.replace(/(\d{3})(\d)/, '$1.$2');
                value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            }
            e.target.value = value;
        });
    }

    // Coloca a máscara no CEP
    const cepInput = document.getElementById('cepInput');
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

function finalizarPagamento() {
    const form = document.getElementById('paymentForm');
    
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const paymentMethod = document.querySelector('input[name="payment"]:checked');
    if (!paymentMethod) {
        alert('Por favor, selecione um método de pagamento.');
        return;
    }
    
    // Simula o processamento do pagamento
    const btn = document.querySelector('.finalize-payment-btn');
    const originalText = btn.textContent;
    btn.textContent = 'PROCESSANDO...';
    btn.disabled = true;
    
    setTimeout(() => {
        alert(`Pagamento via ${paymentMethod.value} processado com sucesso! 🎉\n\nObrigada pela compra!`);
        
        // Limpa o carrinho
        localStorage.removeItem('cartItems');
        
        // Volta pra home
        window.location.href = 'index.html';
    }, 2000);
}
