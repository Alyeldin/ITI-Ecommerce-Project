// Get the product ID from the URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

console.log("Product ID from URL:", productId);

const fetchProductDetails = async () => {
  const url = `https://tmlgzmvphyqiygezzgmc.supabase.co/rest/v1/books?id=eq.${productId}`;
  const anonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtbGd6bXZwaHlxaXlnZXp6Z21jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzOTE0NzMsImV4cCI6MjA4Njk2NzQ3M30.21vSjhruvUUu62QddGvNnUgDpCGWoYoQ2aD-CdAL7R8";

  const options = {
    method: "GET",
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const books = await response.json();

    if (books.length === 0) {
      document.getElementById("product-container").innerHTML =
        '<p class="alert alert-danger">Product not found!</p>';
      return;
    }

    const book = books[0];
    const container = document.getElementById("product-container");

    container.innerHTML = `
      <div class="row">
        <div class=" col-sm-1 col-md-4 col-lg-4 mb-4">
          <img
            src="${book.image_url}"
            alt="${book.title}"
            class="img-fluid rounded mb-3 product-image"
            id="mainImage"
          />
        </div>

        <div class="col-md-6">
          <h2 class="mb-3 sitename ">${book.title}</h2>
          <p class="text-muted mb-4">SKU: ${book.id}</p>
          <div class="mb-3">
            <span class="h4 me-2 sitefont">$${book.price}</span>
          </div>
          <div class="mb-3">
            <i class="bi bi-star-fill text-warning"></i>
            <i class="bi bi-star-fill text-warning"></i>
            <i class="bi bi-star-fill text-warning"></i>
            <i class="bi bi-star-fill text-warning"></i>
            <i class="bi bi-star-half text-warning"></i>
            <span class="ms-2">4.5 (120 reviews)</span>
          </div>
          <p class="mb-4">
            ${book.description || "No description available"}
          </p>

          <div class="mb-4 d-flex flex-wrap align-items-center gap-2">
            <label for="quantity" class="form-label mb-0">Quantity:</label>
            <input
              type="number"
              class="form-control"
              id="quantity"
              value="1"
              min="1"
              style="width: 80px"
            />
            <button class="btn btn-brand rounded px-4" style="width: 220px">
              <i class="bi bi-cart-plus"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Error fetching product details:", error);
    document.getElementById("product-container").innerHTML =
      '<p class="alert alert-danger">Error loading product details!</p>';
  }
};

fetchProductDetails();
