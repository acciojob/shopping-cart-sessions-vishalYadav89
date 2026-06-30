const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];


const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");


// Initialize session storage
if (!sessionStorage.getItem("cart")) {
  sessionStorage.setItem("cart", JSON.stringify([]));
}


// Get cart
function getCart() {
  return JSON.parse(sessionStorage.getItem("cart"));
}


// Save cart
function saveCart(cart) {
  sessionStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );
}


// Show products
function renderProducts() {

  productList.innerHTML = "";

  products.forEach(product => {

    let li = document.createElement("li");

    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="add-btn" data-id="${product.id}">
        Add to Cart
      </button>
    `;

    productList.appendChild(li);

  });

}


// Show cart
function renderCart() {

  cartList.innerHTML = "";

  const cart = getCart();

  cart.forEach(item => {

    let li = document.createElement("li");

    li.innerHTML =
      `${item.name} - $${item.price}`;

    cartList.appendChild(li);

  });

}


// Add product
function addToCart(id) {

  let cart = getCart();

  let product = products.find(
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

  cartList.innerHTML = "";

}


// Button click
productList.addEventListener(
  "click",
  function(e){

    if(e.target.classList.contains("add-btn")){

      let id = Number(
        e.target.dataset.id
      );

      addToCart(id);

    }

  }
);


// Clear button
clearCartBtn.addEventListener(
  "click",
  clearCart
);


// Initial load
renderProducts();
renderCart();