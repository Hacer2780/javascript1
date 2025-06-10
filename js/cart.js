function getCartItems() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function updateCartCount() {
  const cartItems = getCartItems();
  const cartCount = document.querySelector(".header-cart-count");
  if (cartCount) {
    cartCount.textContent = cartItems.length;
  }
}

function displayCart() {
  const cartItems = getCartItems();
  const cartContainer = document.getElementById("cart-items");
  const subtotalElement = document.getElementById("subtotal");
  const shippingCostElement = document.getElementById("shipping-cost");
  const totalPriceElement = document.getElementById("total-price");
  const freeShippingAmountElement = document.getElementById(
    "free-shipping-amount"
  );
  const shippingProgress = document.getElementById("shipping-progress");

  cartContainer.innerHTML = "";
  let subtotal = 0;

  if (cartItems.length === 0) {
    cartContainer.innerHTML = `<tr><td colspan="6">Your cart is empty.</td></tr>`;
    subtotalElement.textContent = "$0.00";
    shippingCostElement.textContent = "$0.00";
    totalPriceElement.textContent = "$0.00";
    if (shippingProgress) shippingProgress.style.width = "0%";
    updateCartCount();
    return;
  }

  cartItems.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td></td>
      <td><img src="${item.image}" alt="${
      item.title
    }" class="cart-image" /></td>
      <td>${item.title}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>1</td>
      <td>$${item.price.toFixed(2)}</td>
      <td><i class="bi bi-x delete-cart" onclick="removeFromCart('${
        item.id
      }')"></i></td>
    `;
    cartContainer.appendChild(row);
    subtotal += item.price;
  });

  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  const shippingCost = subtotal >= 200 ? 0 : 20;
  shippingCostElement.textContent =
    shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`;
  totalPriceElement.textContent = `$${(subtotal + shippingCost).toFixed(2)}`;

  const remaining = 200 - subtotal;
  if (freeShippingAmountElement) {
    freeShippingAmountElement.textContent =
      remaining > 0 ? `$${remaining.toFixed(2)}` : "$0.00";
  }

  if (shippingProgress) {
    shippingProgress.style.width =
      subtotal >= 200 ? "100%" : `${(subtotal / 200) * 100}%`;
  }

  updateCartCount();
}

function removeFromCart(itemId) {
  let cart = getCartItems();
  cart = cart.filter((item) => item.id !== itemId);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  showMessage("Item removed from cart.");
}

function goToCheckout() {
  window.location.href = "../checkout/index.html";
}

function showMessage(msg) {
  let msgBox = document.getElementById("cart-message");
  if (msgBox) {
    msgBox.textContent = msg;
    msgBox.classList.add("show");
    setTimeout(() => {
      msgBox.classList.remove("show");
      msgBox.textContent = "";
    }, 3000);
  }
}

function handleAddToCart() {
  const quantityInput = document.getElementById("quantity");
  const quantity = parseInt(quantityInput.value) || 1;

  const product = {
    id: "temp-id",
    title: "Test Product",
    price: 49.99,
    image: "https://via.placeholder.com/50",
  };

  const cart = getCartItems();
  for (let i = 0; i < quantity; i++) {
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  showMessage(`${quantity} item(s) added to cart.`);
}

document.addEventListener("DOMContentLoaded", () => {
  displayCart();

  const checkoutBtn = document.getElementById("checkout-button");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", goToCheckout);
  }
  
  const addToCartBtn = document.getElementById("add-to-cart");
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", handleAddToCart);
  }
});
