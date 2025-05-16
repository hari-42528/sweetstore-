const products = [
  {
    id: 1,
    name: "Putharekulu (10 pcs)",
    price: 250,
    image: "https://via.placeholder.com/300x180.png?text=Putharekulu"
  },
  {
    id: 2,
    name: "Mango Jelly (250g)",
    price: 150,
    image: "https://via.placeholder.com/300x180.png?text=Mango+Jelly"
  },
  {
    id: 3,
    name: "Dry Fruits Mix (500g)",
    price: 350,
    image: "https://via.placeholder.com/300x180.png?text=Dry+Fruits"
  },
  {
    id: 4,
    name: "Rice Paper Sheets",
    price: 120,
    image: "https://via.placeholder.com/300x180.png?text=Raw+Material"
  }
];

let cart = [];

function displayProducts() {
  const list = document.getElementById("product-list");
  list.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `).join('');
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  document.getElementById("cart-count").innerText = cart.length;
  alert(`${product.name} added to cart`);
}

function viewCart() {
  alert("Cart feature is coming soon!");
}

displayProducts();
// Existing products (no change here)
const products = [
  { id: 1, name: "Putharekulu (10 pcs)", price: 250, image: "https://via.placeholder.com/300x180.png?text=Putharekulu" },
  { id: 2, name: "Mango Jelly (250g)", price: 150, image: "https://via.placeholder.com/300x180.png?text=Mango+Jelly" },
  { id: 3, name: "Dry Fruits Mix (500g)", price: 350, image: "https://via.placeholder.com/300x180.png?text=Dry+Fruits" },
  { id: 4, name: "Rice Paper Sheets", price: 120, image: "https://via.placeholder.com/300x180.png?text=Raw+Material" }
];

// Save cart in localStorage for persistence between pages
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  saveCart();
  alert(`${product.name} added to cart`);
  updateCartCount();
}

function updateCartCount() {
  const count = cart.length;
  const countElement = document.getElementById("cart-count");
  if (countElement) countElement.innerText = count;
}

// 👇 Cart page rendering
function displayCart() {
  const cartContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("total-price");

  if (!cartContainer || !totalElement) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalElement.innerText = "0";
    return;
  }

  let total = 0;
  cartContainer.innerHTML = cart.map((item, index) => {
    total += item.price;
    return `
      <div class="product-card">
        <img src="${item.image}" />
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  }).join('');
  totalElement.innerText = total;
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  displayCart();
  updateCartCount();
}
function checkout() {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const options = {
    key: "rzp_test_9vhJccK43dSViu", // Replace with your Razorpay Key ID
    amount: total * 100, // Razorpay works with paisa (INR x 100)
    currency: "INR",
    name: "Atreyapuram Sweets",
    description: "Order Payment",
    image: "https://via.placeholder.com/100.png?text=Sweets",
    handler: function (response) {
      alert("Payment successful! 🎉 Payment ID: " + response.razorpay_payment_id);
      cart = []; // Clear cart after payment
      saveCart();
      displayCart();
      updateCartCount();
    },
    prefill: {
      name: "",
      email: "",
      contact: ""
    },
    notes: {
      address: "Customer Address"
    },
    theme: {
      color: "#f9a825"
    }
  };

  const rzp = new Razorpay(options);
  rzp.open();
}
