const productList = document.getElementById("product-list");

function displayProducts(items) {
  productList.innerHTML = "";

  items.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <img src="${product.image}" width="100">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;

    productList.appendChild(div);
  });
}

// Show all products on load
displayProducts(products);

// Add to cart
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let product = products.find(p => p.id === id);

  let existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Added to cart");
}

// Search
document.getElementById("search").addEventListener("input", function(e) {
  let value = e.target.value.toLowerCase();

  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(value)
  );

  displayProducts(filtered);
});

// Filter
document.getElementById("filter").addEventListener("change", function(e) {
  let value = e.target.value;

  let filtered = value
    ? products.filter(p => p.category === value)
    : products;

  displayProducts(filtered);
});