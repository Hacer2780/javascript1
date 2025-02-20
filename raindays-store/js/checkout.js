console.log("checkout.js is working!"); 

function displayCheckoutSummary() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const summaryContainer = document.getElementById("order-summary-items");
    const subtotalElement = document.getElementById("subtotal");
    const shippingCostElement = document.getElementById("shipping-cost");
    const totalPriceElement = document.getElementById("total-price");

    if (!summaryContainer) {
        console.error("Error: 'order-summary-items' not found!");
        return;
    }

    summaryContainer.innerHTML = "";
    let subtotal = 0;

    cartItems.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.title}</td>
            <td>$${item.price.toFixed(2)}</td>
        `;
        summaryContainer.appendChild(row);
        subtotal += item.price;
    });

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    const shippingCost = subtotal >= 200 ? 0 : 20;
    shippingCostElement.textContent = shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`;

    totalPriceElement.textContent = `$${(subtotal + shippingCost).toFixed(2)}`;
}

function placeOrder(event) {
    event.preventDefault(); 

    const fullName = document.getElementById("full-name").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value.trim();
    const postalCode = document.getElementById("postal-code").value.trim();
    const cardNumber = document.getElementById("card-number").value.trim();
    const expiry = document.getElementById("expiry").value.trim();
    const cvv = document.getElementById("cvv").value.trim();

    if (!fullName || !address || !city || !postalCode || !cardNumber || !expiry || !cvv) {
        alert("Please fill in all required fields.");
        return;
    }

    localStorage.removeItem("cart");

    const modal = document.getElementById("thank-you-modal");
    if (modal) {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden"; 
    } else {
        console.error("Error: 'thank-you-modal' not found!");
    }
}

function closeModal() {
    const modal = document.getElementById("thank-you-modal");
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; 
    }
}

function goToHome() {
    window.location.href = "../index.html"; 
}

document.addEventListener("DOMContentLoaded", function () {
    displayCheckoutSummary();

    const checkoutButton = document.getElementById("place-order");
    if (checkoutButton) {
        checkoutButton.addEventListener("click", placeOrder);
    }

    const closeButton = document.getElementById("close-modal");
    if (closeButton) {
        closeButton.addEventListener("click", closeModal);
    }

    const goHomeButton = document.getElementById("go-home");
    if (goHomeButton) {
        goHomeButton.addEventListener("click", goToHome);
    }
});
