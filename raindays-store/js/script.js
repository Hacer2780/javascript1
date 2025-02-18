console.log("script.js is working!");

// Function to fetch products from API
async function fetchProducts() {
    try {
        const response = await fetch("https://v2.api.noroff.dev/rainy-days");
        if (!response.ok) {
            throw new Error("Failed to fetch products!");
        }
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}

// Function to display products on the page
async function displayProducts() {
    const products = await fetchProducts();
    const productContainer = document.getElementById("product-list");
    productContainer.innerHTML = "";

    if (products.length === 0) {
        productContainer.innerHTML = "<p>No products found.</p>";
        return;
    }

    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
            <h3>${product.title}</h3>
            <img src="${product.image.url}" alt="${product.image.alt}">
            <p>Price: ${product.price} NOK</p>
            <a href="product/index.html?id=${product.id}">View Details</a>
        `;
        productContainer.appendChild(productElement);
    });
}

// Function to get product ID from URL
function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

// Function to fetch a single product from API
async function fetchProduct(productId) {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/rainy-days/${productId}`);
        if (!response.ok) {
            throw new Error("Product not found!");
        }
        const data = await response.json();
        console.log("Product data from API:", data);
        return data;
    } catch (error) {
        console.error("Error:", error);
    }
}

// Function to display product details on product page
async function displayProduct() {
    const productId = getProductIdFromURL();
    if (!productId) {
        console.error("Product ID not found.");
        return;
    }

    const product = await fetchProduct(productId);
    if (!product || !product.data) {
        console.error("Product not found or API returned empty data.");
        return;
    }

    const productData = product.data;
    const container = document.getElementById("product-details");

    const imageUrl = productData.image ? productData.image.url : "https://via.placeholder.com/150";
    const imageAlt = productData.image ? productData.image.alt : "Product image not available";

    container.innerHTML = `
        <h2>${productData.title}</h2>
        <img src="${imageUrl}" alt="${imageAlt}">
        <p>${productData.description}</p>
        <p><strong>Price:</strong> ${productData.price} NOK</p>
        <button onclick="addToCart('${productData.id}', '${productData.title}', ${productData.price})">Add to Cart</button>
    `;
}

// Function to add a product to the cart
function addToCart(id, title, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ id, title, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${title} has been added to the cart!`);
}

// Function to get cart items from localStorage
function getCartItems() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Function to display cart items on the checkout page
function displayCart() {
    const cartItems = getCartItems();
    const cartContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    cartContainer.innerHTML = ""; // Clear previous content

    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalPriceElement.textContent = "0";
        return;
    }

    let totalPrice = 0;

    cartItems.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
            <p><strong>${item.title}</strong></p>
            <p>Price: ${item.price} NOK</p>
            <button onclick="removeFromCart('${item.id}')">Remove</button>
        `;
        cartContainer.appendChild(itemElement);

        totalPrice += item.price;
    });

    totalPriceElement.textContent = totalPrice;
}

// Function to remove an item from the cart
function removeFromCart(itemId) {
    let cartItems = getCartItems();
    cartItems = cartItems.filter(item => item.id !== itemId);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    displayCart();
}

// Function to handle checkout
function checkout() {
    alert("Thank you for your purchase! Your order has been placed.");
    localStorage.removeItem("cart"); // Clear the cart

    // Redirect to the order confirmation page
    window.location.href = "confirmation/index.html";
}

// Event listener for checkout button (only on checkout page)
const checkoutButton = document.getElementById("checkout-button");
if (checkoutButton) {
    checkoutButton.addEventListener("click", checkout);
}

// Display all products when the page loads
document.addEventListener("DOMContentLoaded", () => {
    const productPage = document.getElementById("product-details");
    if (productPage) {
        displayProduct();
    } else {
        displayProducts();
    }
});