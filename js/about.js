async function fetchAboutImages() {
  try {
    const response = await fetch("https://v2.api.noroff.dev/rainy-days");

    if (!response.ok) {
      throw new Error("Failed to fetch product details");
    }

    const productData = await response.json();

    if (productData.data.length > 0) {
      const firstProduct = productData.data[0];
      const imageUrl = firstProduct.image ? firstProduct.image.url : "https://via.placeholder.com/400";
      const imageAlt = firstProduct.image ? firstProduct.image.alt : "No image available";

      const aboutImageElement = document.getElementById("about-image");
      if (aboutImageElement) {
        aboutImageElement.src = imageUrl;
        aboutImageElement.alt = imageAlt;
      } else {
        showMessage("Image container not found on the page.");
      }
    } else {
      showMessage("No products available to load image.");
    }

  } catch (error) {
    showMessage("Error loading about image. Please try again later.");
  }
}

function showMessage(msg) {
  const box = document.getElementById("message-box");
  if (box) {
    box.textContent = msg;
    box.classList.add("show");
    setTimeout(() => {
      box.classList.remove("show");
      box.textContent = "";
    }, 3000);
  }
}

document.addEventListener("DOMContentLoaded", fetchAboutImages);

