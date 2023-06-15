// LOGIN MODAL
// Seleccionar los elementos del DOM
const openModal = document.getElementById("open-loginModal");
const closeModal = document.getElementById("close-loginModal");
const modalContainer = document.getElementById("modal-container");

// Agregar el evento de clic al botón de abrir
openModal.addEventListener("click", function() {
  modalContainer.style.display = "block";
});

// Agregar el evento de clic al botón de cerrar
closeModal.addEventListener("click", function() {
  modalContainer.style.display = "none";
});

// Agregar el evento de clic en cualquier lugar fuera del modal para cerrarlo
window.addEventListener("click", function(event) {
  if (event.target == modalContainer) {
    modalContainer.style.display = "none";
  }
});

// PRODUCTS

const arrProducts = [
  {imageUrl: '../images/t4.jpg', name: 'Coffee or Tea with Milk or Chocolate', description: 'Coffee or Tea with Milk or Chocolate.', price: 5, keyword: 'coffee', type: 'breakfast/dessert'},
  {imageUrl: '../images/frenchToasts.png', name: 'French Toasts with Agave Syrup or Honey', description: 'Sweet french style toasts, and you can choose the syrup.', price: 15, keyword: 'frenchToasts', type: 'breakfast/dessert'},
  {imageUrl: '../images/t2.jpg', name: 'Chicken Burger With Cheese and Butter', description: 'Vegetable and chicken burguer with extra butter.', price: 22, keyword: 'chickenBurger', type: 'lunch/dinner'},
  {imageUrl: '../images/t1.jpg', name: 'Hot Pizza With Extra Cheese and Butter', description: 'Not vegetable pizza, with extra cheese and butter.', price: 25, keyword: 'hotPizza', type: 'lunch/dinner'},
  {imageUrl: '../images/t3.jpg', name: 'Chicken Fries with Barbacue Sauce', description: 'Chicken fries with tomato and lettuce salad.', price: 18, keyword: 'chickenFries', type: 'lunch/dinner'},
]

const orderedProducts = [];
function addProduct(productName) {
  arrProducts.forEach((product) => {
    if(product.keyword == productName) {
      orderedProducts.push(product);
    }
  });

  localStorage.setItem('cart', JSON.stringify(orderedProducts));


  // Get CartItems
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCountElement = document.getElementById('cart-count');
  if(cartItems.length) {
    cartCountElement.classList.add('cartCount')
  }
  cartCountElement.textContent = cartItems.length;
};

// Get CartItems if no orderer
const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
const cartCountElement = document.getElementById('cart-count');
if(cartItems.length) {
  cartCountElement.classList.add('cartCount')
  cartCountElement.textContent = cartItems.length;
}

// CART DRAWER

const cartDrawer = document.getElementById('cart-drawer');
const cartToggle = document.getElementById('cart-toggle');
const cartClose = document.getElementById('cart-close');
const cartContent = document.getElementById('cart-content');
const cartFooter = document.getElementById('cart-footer');

function openCartDrawer() {
  cartDrawer.style.right = 0;
  renderCart();
}

function closeCartDrawer() {
  cartDrawer.style.right = '-500px';
}

// For recharge the totalPrice.
let totalPriceElement;

function renderCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartContent.innerHTML = '';
  if (cartItems.length === 0) {
    const emptyCart = document.createElement('p');
    emptyCart.textContent = 'Your cart is empty.';
    emptyCart.classList.add('empty-cart');
    cartContent.appendChild(emptyCart);
  } else {
    const cartList = document.createElement('ul');
    cartItems.forEach(item => {
      const listItem = document.createElement('li');
      listItem.classList.add('product')

      const img = document.createElement('img');
      img.src = item.imageUrl;
      img.alt = item.name;
      img.classList.add('product-image');
      listItem.appendChild(img);

      const name = document.createElement('span');
      name.textContent = item.name;
      name.classList.add('product-name');
      listItem.appendChild(name);

      const price = document.createElement('span');
      price.textContent = `$ ${item.price}`;
      price.classList.add('product-price');
      listItem.appendChild(price);

      cartList.appendChild(listItem);
    });
    
    cartContent.appendChild(cartList);
  }
  
  const totalPrice = calculateTotalPrice(cartItems);
  if (totalPriceElement) {
    if (typeof totalPrice === 'number') {
      totalPriceElement.textContent = `Total price: $ ${totalPrice.toFixed(2)}`;
    } else {
      totalPriceElement.textContent = 'Error calculating total price';
    }
  }
}

totalPriceElement = document.createElement('div');
totalPriceElement.classList.add('total-price');
cartFooter.appendChild(totalPriceElement);

renderCart();


function calculateTotalPrice(cartItems) {
  return cartItems.reduce((total, item) => total + item.price, 0);
}

cartToggle.addEventListener('click', openCartDrawer);

cartClose.addEventListener('click', closeCartDrawer);

cartDrawer.addEventListener('click', event => {
  if (event.target === cartDrawer) {
    closeCartDrawer();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeCartDrawer();
  }
});

renderCart();