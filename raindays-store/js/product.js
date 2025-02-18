// Function to get the product ID from the URL
function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

// Function to fetch a specific product from the API
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

// Function to display product details on the page
async function displayProduct() {
    const productId = getProductIdFromURL();
    if (!productId) {
        console.error("Product ID not found.");
        return;
    }

    const product = await fetchProduct(productId);
    if (!product || !product.data) {
        console.error("Product not found or no data received from the API.");
        return;
    }

    const productData = product.data; // Extracting the 'data' object from the API response

    const container = document.getElementById("product-details");

    // If the image is not defined, show a placeholder image
    const imageUrl = productData.image ? productData.image.url : "https://via.placeholder.com/150";
    const imageAlt = productData.image ? productData.image.alt : "No product image available";

    container.innerHTML = `
        <h2>${productData.title}</h2>
        <img src="${imageUrl}" alt="${imageAlt}">
        <p>${productData.description}</p>
        <p><strong>Price:</strong> ${productData.price} NOK</p>
        <button onclick="addToCart('${productData.id}', '${productData.title.replace(/'/g, "\\'")}', ${productData.price})">Add to Cart</button>
    `;
}

// Function to add a product to the cart
function addToCart(id, title, price,) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product is already in the cart
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        alert("This product is already in your cart!");
        return;
    }

    cart.push({ id, title, price });
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${title} has been added to the cart!`);

    // Redirect to the checkout page after adding to the cart
   /* window.location.assign("../checkout/index.html"); */
}
// Display product details when the page loads
document.addEventListener("DOMContentLoaded", displayProduct);
