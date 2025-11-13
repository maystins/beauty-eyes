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

// Logout
if (logoutBtn) {
    logoutBtn.onclick = (e) => {
        e.preventDefault();
        isLoggedIn = false;
        updateUserInterface();
    };
}

// Atualizar interface ao abrir o popup
userBtn.onclick = () => {
    updateUserInterface(); // Verifica o estado antes de abrir
    userOverlay.classList.add('active');
    userPopup.classList.add('active');
    document.body.style.overflow = 'hidden';
};