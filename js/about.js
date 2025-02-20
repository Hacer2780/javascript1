
async function fetchAboutImages() {
    try {
        const response = await fetch("https://v2.api.noroff.dev/rainy-days"); 

        if (!response.ok) {
            throw new Error("Failed to fetch product details");
        }

        const productData = await response.json();
        console.log("Product data from API:", productData);

        if (productData.data.length > 0) {
            const firstProduct = productData.data[0]; 
            const imageUrl = firstProduct.image ? firstProduct.image.url : "https://via.placeholder.com/400";
            const imageAlt = firstProduct.image ? firstProduct.image.alt : "No image available";

            const aboutImageElement = document.getElementById("about-image");
            if (aboutImageElement) {
                aboutImageElement.src = imageUrl;
                aboutImageElement.alt = imageAlt;
                console.log("Image successfully updated:", imageUrl);
            } else {
                console.error("Error: 'about-image' element not found!");
            }
        } else {
            console.warn("Warning: Product list from API is empty!");
        }

    } catch (error) {
        console.error("Error occurred:", error);
    }
}

document.addEventListener("DOMContentLoaded", fetchAboutImages);
