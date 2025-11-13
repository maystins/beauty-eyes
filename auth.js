// Funções de autenticação

function switchToLogin(event) {
    event.preventDefault();
    document.getElementById('cadastroForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('authBreadcrumb').textContent = 'Login';
}

function switchToCadastro(event) {
    event.preventDefault();
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('cadastroForm').style.display = 'block';
    document.getElementById('authBreadcrumb').textContent = 'Cadastro';
}

function handleCadastro(event) {
    event.preventDefault();
    
    const form = event.target;
    const senha = form.querySelector('input[type="password"]').value;
    const confirmarSenha = form.querySelectorAll('input[type="password"]')[1].value;
    
    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
    }
    
    // Simula cadastro bem-sucedido
    alert('Cadastro realizado com sucesso!');
    
    // Marca como logado
    isLoggedIn = true;
    updateUserInterface();
    
    // Redireciona para home
    window.location.href = 'index.html';
}

function handleLogin(event) {
    event.preventDefault();
    
    // Simula login bem-sucedido
    alert('Login realizado com sucesso!');
    
    // Marca como logado
    isLoggedIn = true;
    updateUserInterface();
    
    // Redireciona para home
    window.location.href = 'index.html';
}
