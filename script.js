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

// 🔹 Get cart from sessionStorage
function getCart() {
  return JSON.parse(sessionStorage.getItem("cart")) || [];
}

// 🔹 Save cart to sessionStorage
function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// 🔹 Render product list
function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="add-to-cart-btn" data-id="${product.id}">
        Add to Cart
      </button>
    `;

    productList.appendChild(li);
  });
}

// 🔹 Render cart list
function renderCart() {
  const cart = getCart();
  cartList.innerHTML = "";

  // if (cart.length === 0) {
  //   cartList.innerHTML = "<li>Cart is empty</li>";
  //   return;
  // }

  cart.forEach((item) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${item.name} - $${item.price}
      <button class="remove-btn" data-id="${item.id}">
        Remove
      </button>
    `;

    cartList.appendChild(li);
  });
}

// 🔹 Add item to cart
function addToCart(productId) {
  const cart = getCart();
  const product = products.find(p => p.id === productId);

  cart.push(product);

  saveCart(cart);
  renderCart();
}

// 🔹 Remove item from cart
function removeFromCart(productId) {
  let cart = getCart();

  cart = cart.filter(item => item.id !== productId);

  saveCart(cart);
  renderCart();
}

// 🔹 Clear cart
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// 🔹 Event Delegation for Add to Cart
productList.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const id = Number(e.target.dataset.id);
    addToCart(id);
  }
});

// 🔹 Event Delegation for Remove
cartList.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const id = Number(e.target.dataset.id);
    removeFromCart(id);
  }
});

// 🔹 Clear cart button
clearCartBtn.addEventListener("click", clearCart);

// 🔹 Initial render (important for persistence)
renderProducts();
renderCart();