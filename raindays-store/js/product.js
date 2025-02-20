
document.addEventListener("DOMContentLoaded", async function () {
    const productId = new URLSearchParams(window.location.search).get("id");
    if (!productId) return;

    try {
        const response = await fetch(`https://v2.api.noroff.dev/rainy-days/${productId}`);
        if (!response.ok) throw new Error("Product not found");
        const productData = await response.json();
        
        document.getElementById("product-title").textContent = productData.data.title;
        document.getElementById("main-product-image").src = productData.data.image.url;
        document.getElementById("main-product-image").alt = productData.data.image.alt;
        document.getElementById("product-description").textContent = productData.data.description;
        document.getElementById("product-price").textContent = productData.data.price;

        const thumbnailContainer = document.getElementById("thumbnail-container");
        productData.data.additionalImages?.forEach(img => {
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
    }
});