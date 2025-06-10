
document.addEventListener("DOMContentLoaded", function () {
  displayCheckoutSummary();

  const checkoutButton = document.getElementById("place-order");
  if (checkoutButton) {
    checkoutButton.addEventListener("click", placeOrder);
  }
});

function displayCheckoutSummary() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const summaryContainer = document.getElementById("order-summary-items");
  const subtotalElement = document.getElementById("subtotal");
  const shippingCostElement = document.getElementById("shipping-cost");
  const totalPriceElement = document.getElementById("total-price");

  if (!summaryContainer) return;

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

  const requiredFields = [
    "full-name",
    "address",
    "city",
    "postal-code",
    "card-number",
    "expiry",
    "cvv"
  ];

  const formValid = requiredFields.every(id => {
    const el = document.getElementById(id);
    return el && el.value.trim() !== "";
  });

  if (!formValid) {
    showMessage("Please fill in all required fields before placing your order.");
    return;
  }

  localStorage.removeItem("cart");
  window.location.href = "confirmation/index.html";
}

function showMessage(msg) {
  const box = document.getElementById("message-box");
  box.textContent = msg;
  box.classList.add("show");
  setTimeout(() => {
    box.classList.remove("show");
    box.textContent = "";
  }, 3000);
}

