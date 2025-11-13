// ✨ Sistema de Login e Cadastro ✨
// Pra deixar tudo seguro e organizado!

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
    
    // Simula o cadastro
    alert('Cadastro realizado com sucesso!');
    
    // Marca como logada
    isLoggedIn = true;
    updateUserInterface();
    
    // Volta pra home
    window.location.href = 'index.html';
}

function handleLogin(event) {
    event.preventDefault();
    
    // Simula o login
    alert('Login realizado com sucesso!');
    
    // Marca como logada
    isLoggedIn = true;
    updateUserInterface();
    
    // Volta pra home
    window.location.href = 'index.html';
}
