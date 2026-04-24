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
  const cart = sessionStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
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
      <button data-id="${product.id}">Add to Cart</button>
    `;

    productList.appendChild(li);
  });
}

// 🔹 Render cart list
function renderCart() {
  const cart = getCart();
  cartList.innerHTML = "";

  // ✅ IMPORTANT: Do NOT add anything if empty (Cypress requirement)
  cart.forEach((item) => {
    const li = document.createElement("li");

    li.textContent = `${item.name} - $${item.price}`;

    cartList.appendChild(li);
  });
}

// 🔹 Add item to cart
function addToCart(productId) {
  // ✅ ALWAYS read existing cart
  const cart = getCart();

  // ✅ find product
  const product = products.find(p => p.id === productId);

  // ✅ push (DO NOT replace)
  cart.push(product);

  // ✅ save back
  sessionStorage.setItem("cart", JSON.stringify(cart));

  renderCart();
}

// 🔹 Clear cart
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// 🔹 Event: Add to Cart (event delegation)
productList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const id = Number(e.target.dataset.id);
    addToCart(id);
  }
});

// 🔹 Event: Clear Cart
clearCartBtn.addEventListener("click", clearCart);

// 🔹 Initial render (handles persistence)
renderProducts();
renderCart();