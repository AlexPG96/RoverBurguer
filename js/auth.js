// AUTH LOGIN

function authUser() {
    
    const user = {
        id: 1,
        nombre: "Alejandro",
        correo: "ap96.gonzalez@gmail.com",
        authenticated: true,
    };

    const userJSON = JSON.stringify(user);
    document.cookie = "user=" + encodeURIComponent(userJSON) + "; path=/";

    window.location.href = 'auth/index.html';
}

// Cookie?
const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)user\s*\=\s*([^;]*).*$)|^.*$/, "$1");

const accountText = document.getElementById('accountName');

if (cookieValue) {
  accountText.textContent = 'Alejandro';
} else {
  accountText.textContent = 'Account';
}


function logout(cookieName) {
    document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '../index.html';
}

const arrOrders = [
    {name: 'Order #24005', date: '17/05/2023', products: ['2 x Coffee with Milk', ' 2 x French Toasts with Agave Syrup or Honey'], totalPrice: 40},
    {name: 'Order #23950', date: '14/05/2023', products: ['2 x Coffee with Chocolate.', ' 1 x French Toasts with Agave Syrup or Honey'], totalPrice: 25},
    {name: 'Order #23805', date: '09/05/2023', products: ['1 x Chicken Burger With Cheese and Butter', '1 x German Imported Beer'], totalPrice: 29.6},
    {name: 'Order #22700', date: '05/05/2023', products: ['2 x Hot Pizza With Extra Cheese and Butter', '1 x Vegetable pizza with vegetables', '2 x German Imported Beer', '1 x Cola Flavoured Soda'], totalPrice: 86.4},
    {name: 'Order #21002', date: '02/05/2023', products: ['2 x Coffee with Milk', ' 1 x French Toasts with Agave Syrup or Honey'], totalPrice: 25},
]

const ordersContent = document.getElementById('my-orders-content');

for (let i = 0; i < arrOrders.length; i++) {
  const order = arrOrders[i];
  const orderItem = document.createElement('li');
  orderItem.classList.add('orderItem');

  const orderDetailsDiv = document.createElement('div');
  orderDetailsDiv.innerHTML = `<h3 class="white">${order.name}</h3>`;
  const orderNameProducts = document.createElement('p');
  orderNameProducts.classList.add('orderSummary')
  orderNameProducts.innerHTML = `<br><span>${order.products.join('<br>')}</span>`;

  const totalPriceDiv = document.createElement('p');
  totalPriceDiv.classList.add('price');
  totalPriceDiv.textContent = `$${order.totalPrice}`;

  orderDetailsDiv.appendChild(orderNameProducts);

  orderItem.appendChild(orderDetailsDiv);
  orderItem.appendChild(totalPriceDiv);
  ordersContent.appendChild(orderItem);
}




  
  