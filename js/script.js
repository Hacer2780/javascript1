async function fetchProducts() {
  try {
    const response = await fetch("https://v2.api.noroff.dev/rainy-days");
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    const container = document.getElementById("product-list");
    if (container) {
      container.innerHTML = "<p>Sorry, we couldn't load products at this time.</p>";
    }
    return [];
  }
}

async function displayProducts() {
  const products = await fetchProducts();
  const productContainer = document.getElementById("product-list");
  if (!productContainer) return;

  const genderFilter = document.getElementById("category-filter");
  const sortFilter = document.getElementById("sort-filter");

  const selectedGender = genderFilter ? genderFilter.value : "all";
  const selectedSort = sortFilter ? sortFilter.value : "all";

  productContainer.innerHTML = "";

  let filteredProducts = products.filter((product) => {
    return (
      selectedGender === "all" ||
      (product.gender && product.gender.toLowerCase() === selectedGender)
    );
  });

  if (selectedSort === "low-to-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (selectedSort === "high-to-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (filteredProducts.length === 0) {
    productContainer.innerHTML = "<p>No products found.</p>";
    return;
  }

  filteredProducts.forEach((product) => {
    const imageUrl = product.image?.url || "https://via.placeholder.com/200";
    const imageAlt = product.image?.alt || "Product Image";

    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.innerHTML = `
      <h3>${product.title}</h3>
      <img src="${imageUrl}" alt="${imageAlt}">
      <p>Price: ${product.price} NOK</p>
      <a href="product/index.html?id=${product.id}">View Details</a>
    `;
    productContainer.appendChild(productElement);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  displayProducts();

  const genderFilter = document.getElementById("category-filter");
  if (genderFilter) {
    genderFilter.addEventListener("change", displayProducts);
  }

  const sortFilter = document.getElementById("sort-filter");
  if (sortFilter) {
    sortFilter.addEventListener("change", displayProducts);
  }
});
