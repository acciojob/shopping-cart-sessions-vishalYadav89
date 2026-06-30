// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];


// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");


// Get cart from sessionStorage
function getCart() {

  const cart = sessionStorage.getItem("cart");

  return cart ? JSON.parse(cart) : [];

}


// Save cart to sessionStorage
function saveCart(cart) {

  sessionStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

}


// Render products
function renderProducts() {

  productList.innerHTML = "";

  products.forEach(product => {

    const li = document.createElement("li");

    li.innerHTML = `
      ${product.name} - $${product.price}
      <button data-id="${product.id}">
        Add to Cart
      </button>
    `;

    productList.appendChild(li);

  });

}


// Render cart
function renderCart() {

  const cart = getCart();

  cartList.innerHTML = "";

  cart.forEach(item => {

    const li = document.createElement("li");

    li.textContent =
      `${item.name} - $${item.price}`;

    cartList.appendChild(li);

  });

}


// Add product to cart
function addToCart(id) {

  let cart = getCart();

  const product = products.find(
    p => p.id === id
  );


  cart.push({
    id: product.id,
    name: product.name,
    price: product.price
  });


  saveCart(cart);

  renderCart();

}


// Clear cart
function clearCart() {

  sessionStorage.setItem(
    "cart",
    JSON.stringify([])
  );

  renderCart();

}


// Add to cart button event
productList.addEventListener(
  "click",
  function(event) {

    if (event.target.tagName === "BUTTON") {

      const id = Number(
        event.target.getAttribute("data-id")
      );

      addToCart(id);

    }

  }
);


// Clear button event
clearCartBtn.addEventListener(
  "click",
  clearCart
);


// Load page
renderProducts();
renderCart();