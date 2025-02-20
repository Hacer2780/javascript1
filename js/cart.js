
function getCartItems() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function updateCartCount() {
    const cartItems = getCartItems();
    const cartCountElement = document.querySelector(".header-cart-count");

    if (cartCountElement) {
        cartCountElement.textContent = cartItems.length;
    }
}

function displayCart() {
    const cartItems = getCartItems();
    const cartContainer = document.getElementById("cart-items");
    const subtotalElement = document.getElementById("subtotal");
    const shippingCostElement = document.getElementById("shipping-cost");
    const totalPriceElement = document.getElementById("total-price");
    const freeShippingAmountElement = document.getElementById("free-shipping-amount");
    const shippingProgress = document.getElementById("shipping-progress");

    cartContainer.innerHTML = "";
    let subtotal = 0;

    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<tr><td colspan='6'>Your cart is empty.</td></tr>";
        subtotalElement.textContent = "$0.00";
        totalPriceElement.textContent = "$0.00";
        updateCartCount(); 
        return;
    }

    cartItems.forEach(item => {
        const itemElement = document.createElement("tr");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
            <td></td>
            <td class="cart-image">
                <img src="${item.image}" alt="${item.title}" />
                <i class="bi bi-x delete-cart" onclick="removeFromCart('${item.id}')"></i>
            </td>
            <td>${item.title}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>1</td>
            <td>$${item.price.toFixed(2)}</td>
        `;
        cartContainer.appendChild(itemElement);
        subtotal += item.price;
    });

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;

   
    const freeShippingThreshold = 200;
    const remainingAmount = freeShippingThreshold - subtotal;
    
    if (remainingAmount > 0) {
        shippingCostElement.textContent = "$20.00";
        freeShippingAmountElement.textContent = `$${remainingAmount.toFixed(2)}`;
        shippingProgress.style.width = `${(subtotal / freeShippingThreshold) * 100}%`;
    } else {
        shippingCostElement.textContent = "Free";
        shippingProgress.style.width = "100%";
    }

    totalPriceElement.textContent = `$${subtotal.toFixed(2)}`;

    updateCartCount(); 
}

function removeFromCart(itemId) {
    let cartItems = getCartItems();
    cartItems = cartItems.filter(item => item.id !== itemId);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    displayCart();
    updateCartCount(); 
}

function checkout() {
    alert("Thank you for your purchase! Your order has been placed.");
    localStorage.removeItem("cart");
    window.location.href = "confirmation/index.html";
}

document.addEventListener("DOMContentLoaded", function () {
    displayCart();
    updateCartCount();
});

document.getElementById("checkout-button").addEventListener("click", checkout);
