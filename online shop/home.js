// =======================
// PRODUCTS DATABASE
// =======================

const products = [
    { id: 1, name: "Urban Sneakers", price: 5999, category: "shoes", image: "https://source.unsplash.com/400x400/?sneakers" },
    { id: 2, name: "Street Hoodie", price: 3499, category: "hoodies", image: "https://source.unsplash.com/400x400/?hoodie" },
    { id: 3, name: "Classic T-Shirt", price: 1999, category: "tshirts", image: "https://source.unsplash.com/400x400/?tshirt" },
    { id: 4, name: "Running Shoes", price: 4999, category: "shoes", image: "https://source.unsplash.com/400x400/?running-shoes" },
    { id: 5, name: "Oversized Hoodie", price: 3999, category: "hoodies", image: "https://source.unsplash.com/400x400/?black-hoodie" }
];

// =======================
// CART STORAGE
// =======================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// =======================
// SAVE CART
// =======================

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// =======================
// UPDATE CART COUNT
// =======================

function updateCartCount() {
    const count = document.getElementById("cart-count");
    if (count) {
        count.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

// =======================
// DISPLAY PRODUCTS
// =======================

function displayProducts(filteredProducts = products) {
    const grid = document.getElementById("product-grid");
    if (!grid) return;

    grid.innerHTML = "";

    filteredProducts.forEach(product => {
        grid.innerHTML += `
        <div class="product">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>KES ${product.price}</p>
            <button onclick="viewProduct(${product.id})">View</button>
        </div>`;
    });
}

// =======================
// FILTER PRODUCTS
// =======================

function filterProducts(category) {
    if (category === "all") {
        displayProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        displayProducts(filtered);
    }
}

// =======================
// VIEW PRODUCT
// =======================

function viewProduct(id) {
    localStorage.setItem("selectedProduct", id);
    window.location.href = "product.html";
}

// =======================
// DISPLAY PRODUCT DETAILS
// =======================

function displayProductDetails() {
    const container = document.getElementById("product-details");
    if (!container) return;

    const id = localStorage.getItem("selectedProduct");
    const product = products.find(p => p.id == id);

    if (!product) {
        container.innerHTML = "<p>Product not found.</p>";
        return;
    }

    container.innerHTML = `
        <img src="${product.image}" width="300">
        <h2>${product.name}</h2>
        <p>KES ${product.price}</p>
        <button onclick="addToCart(${product.id})" class="btn">Add to Cart</button>
    `;
}

// =======================
// ADD TO CART (WITH QUANTITY)
// =======================

function addToCart(id) {
    const product = products.find(p => p.id === id);

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    alert("Product added to cart!");
}

// =======================
// DISPLAY CART
// =======================

function displayCart() {
    const itemsContainer = document.getElementById("cart-items");
    const totalElement = document.getElementById("total-price");

    if (!itemsContainer || !totalElement) return;

    itemsContainer.innerHTML = "";

    if (cart.length === 0) {
        itemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalElement.textContent = 0;
        return;
    }

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        itemsContainer.innerHTML += `
            <div style="margin-bottom:10px;">
                <strong>${item.name}</strong><br>
                KES ${item.price} × ${item.quantity} 
                <br>
                <button onclick="increaseQuantity(${item.id})">+</button>
                <button onclick="decreaseQuantity(${item.id})">-</button>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
    });

    totalElement.textContent = total;
}

// =======================
// INCREASE QUANTITY
// =======================

function increaseQuantity(id) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += 1;
        saveCart();
        displayCart();
    }
}

// =======================
// DECREASE QUANTITY
// =======================

function decreaseQuantity(id) {
    const item = cart.find(i => i.id === id);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart = cart.filter(i => i.id !== id);
    }

    saveCart();
    displayCart();
}

// =======================
// REMOVE FROM CART
// =======================

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    displayCart();
}

// =======================
// PLACE ORDER
// =======================

function placeOrder(event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    document.getElementById("order-message").textContent = 
        "Order placed successfully! We will contact you shortly.";

    cart = [];
    saveCart();
    displayCart();
}

// =======================
// INITIALIZE PAGE
// =======================

displayProducts();
displayProductDetails();
displayCart();
updateCartCount();

