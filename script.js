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