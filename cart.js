const cartItemsDiv = document.getElementById("cart-items");
const totalSpan = document.getElementById("total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {
  cartItemsDiv.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<h3>Cart is empty</h3>";
    totalSpan.innerText = 0;
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");

    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>₹${item.price}</p>
      <button onclick="decrease(${index})">-</button>
      ${item.quantity}
      <button onclick="increase(${index})">+</button>
      <button onclick="removeItem(${index})">Remove</button>
      <hr>
    `;

    cartItemsDiv.appendChild(div);
  });

  totalSpan.innerText = total;
}

function increase(i) {
  cart[i].quantity++;
  updateCart();
}

function decrease(i) {
  if (cart[i].quantity > 1) {
    cart[i].quantity--;
  }
  updateCart();
}

function removeItem(i) {
  cart.splice(i, 1);
  updateCart();
}

function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

displayCart();