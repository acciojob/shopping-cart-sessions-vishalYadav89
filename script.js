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


// Do NOT reset sessionStorage here
function getCart() {

  const data = sessionStorage.getItem("cart");

  return data ? JSON.parse(data) : [];

}


function saveCart(cart) {

  sessionStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

}



function renderProducts() {

  productList.innerHTML = "";

  products.forEach(product => {

    const li = document.createElement("li");

    const button = document.createElement("button");

    button.innerText = "Add to Cart";
    button.dataset.id = product.id;
    button.className = "add-btn";


    li.innerHTML =
      `${product.name} - $${product.price} `;

    li.appendChild(button);

    productList.appendChild(li);

  });

}



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



function addToCart(id) {

  let cart = getCart();

  const product = products.find(
    p => p.id === id
  );


  cart.push(product);


  saveCart(cart);

  renderCart();

}



productList.addEventListener(
  "click",
  function(e) {

    if(e.target.classList.contains("add-btn")) {

      addToCart(Number(e.target.dataset.id));

    }

  }
);



clearCartBtn.addEventListener(
  "click",
  function() {

    sessionStorage.setItem(
      "cart",
      JSON.stringify([])
    );

    renderCart();

  }
);



renderProducts();
renderCart();