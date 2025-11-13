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
    
    // Máscara de telefone
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                if (value.length <= 10) {
                    value = value.replace(/(\d{2})(\d)/, '($1) $2');
                    value = value.replace(/(\d{4})(\d)/, '$1-$2');
                } else {
                    value = value.replace(/(\d{2})(\d)/, '($1) $2');
                    value = value.replace(/(\d{5})(\d)/, '$1-$2');
                }
            }
            e.target.value = value;
        });
    });
    
    // Validação de email
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', (e) => {
            const email = e.target.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                e.target.setCustomValidity('Por favor, digite um email válido!');
                e.target.reportValidity();
            } else {
                e.target.setCustomValidity('');
            }
        });
    });
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
    btn.innerHTML = '<span class="spinner"></span> PROCESSANDO...';
    btn.disabled = true;
    btn.style.opacity = '0.7';
    
    setTimeout(() => {
        alert(`Pagamento via ${paymentMethod.value} processado com sucesso! 🎉\n\nObrigada pela compra!`);
        
        // Limpa o carrinho
        localStorage.removeItem('cartItems');
        
        // Volta pra home
        window.location.href = 'index.html';
    }, 2000);
}
