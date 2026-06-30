// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 }
];


// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");



// Get cart
function getCart() {

  const data = sessionStorage.getItem("cart");

  if (data === null) {
    return [];
  }

  return JSON.parse(data);
}



// Save cart
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

    li.innerHTML =
      `${product.name} - $${product.price}
       <button class="add-btn" data-id="${product.id}">
       Add to Cart
       </button>`;

    productList.appendChild(li);

  });

}



// Render cart
function renderCart() {

  cartList.innerHTML = "";

  const cart = getCart();


  cart.forEach(item => {

    const li = document.createElement("li");

    li.textContent =
      `${item.name} - $${item.price}`;

    cartList.appendChild(li);

  });

}



// Add item to cart
function addToCart(id) {

  let cart = getCart();


  const product = products.find(
    product => product.id === id
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



// Add button click
productList.addEventListener(
  "click",
  function(event) {

    if (event.target.classList.contains("add-btn")) {

      const id = Number(
        event.target.dataset.id
      );

      addToCart(id);

    }

  }
);



// Clear button click
clearCartBtn.addEventListener(
  "click",
  clearCart
);



// Page load
renderProducts();
renderCart();