console.log("checkout.js is working!");

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

// Event listener for checkout button
document.getElementById("checkout-button").addEventListener("click", checkout);

// Display cart items when the page loads
document.addEventListener("DOMContentLoaded", displayCart);
