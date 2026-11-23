const products = [
    { id: 1, name: "Urban Sneakers", price: 5999, image: "https://source.unsplash.com/400x400/?sneakers" },
    { id: 2, name: "Street Hoodie", price: 3499, image: "https://source.unsplash.com/400x400/?hoodie" },
    { id: 3, name: "Classic T-Shirt", price: 1999, image: "https://source.unsplash.com/400x400/?tshirt" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const count = document.getElementById("cart-count");
    if (count) count.textContent = cart.length;
}

function displayProducts() {
    const grid = document.getElementById("product-grid");
    if (!grid) return;

    products.forEach(product => {
        grid.innerHTML += `
        <div class="product">
            <img src="${product.image}">
            <h3>${product.name}</h3>
            <p>KES ${product.price}</p>
            <button onclick="viewProduct(${product.id})">View</button>
        </div>`;
    });
}

function viewProduct(id) {
    localStorage.setItem("selectedProduct", id);
    window.location.href = "product.html";
}

function displayProductDetails() {
    const container = document.getElementById("product-details");
    if (!container) return;

    const id = localStorage.getItem("selectedProduct");
    const product = products.find(p => p.id == id);

    container.innerHTML = `
        <img src="${product.image}" width="300">
        <h2>${product.name}</h2>
        <p>KES ${product.price}</p>
        <button onclick="addToCart(${product.id})" class="btn">Add to Cart</button>
    `;
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    saveCart();
    alert("Added to cart!");
}

function displayCart() {
    const items = document.getElementById("cart-items");
    const totalEl = document.getElementById("total-price");
    if (!items) return;

    let total = 0;
    items.innerHTML = "";

    cart.forEach(item => {
        total += item.price;
        items.innerHTML += `<p>${item.name} - KES ${item.price}</p>`;
    });

    totalEl.textContent = total;
}

function placeOrder(e) {
    e.preventDefault();
    document.getElementById("order-message").textContent = "Order placed successfully!";
    cart = [];
    saveCart();
}

displayProducts();
displayProductDetails();
displayCart();
updateCartCount();



