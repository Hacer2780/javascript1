
let productData = null;

document.addEventListener("DOMContentLoaded", async function () {
  const productId = new URLSearchParams(window.location.search).get("id");
  if (!productId) return;

  try {
    const response = await fetch(`https://v2.api.noroff.dev/rainy-days/${productId}`);
    if (!response.ok) throw new Error("Product not found");
    const data = await response.json();
    productData = data.data;

    document.getElementById("product-title").textContent = productData.title;
    document.getElementById("main-product-image").src = productData.image.url;
    document.getElementById("main-product-image").alt = productData.image.alt;
    document.getElementById("product-description").textContent = productData.description;
    document.getElementById("product-price").textContent = productData.price;

    const thumbnailContainer = document.getElementById("thumbnail-container");
    productData.additionalImages?.forEach(img => {
      const imgElement = document.createElement("img");
      imgElement.src = img.url;
      imgElement.alt = img.alt;
      imgElement.addEventListener("click", () => {
        document.getElementById("main-product-image").src = img.url;
      });
      thumbnailContainer.appendChild(imgElement);
    });

  } catch (error) {
    console.error("Error loading product:", error);
    const container = document.getElementById("product-details");
    if (container) {
      container.innerHTML = "<p>Sorry, this product could not be loaded.</p>";
    }
  }
});

function addToCart(id, title, price) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ id, title, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  showMessage(`${title} has been added to your cart!`);
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

document.getElementById("add-to-cart").addEventListener("click", function () {
  if (productData) {
    addToCart(productData.id, productData.title, productData.price);
  }
});
