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

// 🔹 Get cart
function getCart() {
  const data = sessionStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
}

// 🔹 Save cart
function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// 🔹 Render products
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

// 🔹 Render cart
function renderCart() {
  const cart = getCart();
  cartList.innerHTML = "";

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// 🔹 Add to cart
function addToCart(productId) {
  const cart = getCart(); // ✅ IMPORTANT

  const product = products.find(p => p.id === productId);

  cart.push(product); // ✅ APPEND

  saveCart(cart); // ✅ SAVE

  renderCart();
}

// 🔹 Clear cart
function clearCart() {
  sessionStorage.removeItem("cart"); // ✅ IMPORTANT
  renderCart();
}

// 🔹 Event: Add to Cart
productList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const id = Number(e.target.dataset.id);
    addToCart(id);
  }
});

// 🔹 Event: Clear Cart
clearCartBtn.addEventListener("click", clearCart);

// 🔹 Initial render
renderProducts();
renderCart();