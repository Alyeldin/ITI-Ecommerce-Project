// Get author_id from URL (?author_id=2)
let params = new URLSearchParams(window.location.search);
let authorId = params.get("id");
console.log(authorId);

const fetchBooks = async () => {
  let url = "https://tmlgzmvphyqiygezzgmc.supabase.co/rest/v1/books?select=*";
  if (authorId) {
    url += `&author_id=eq.${authorId}`;
  }
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
    //fetching file from api
    const response = await fetch(url, options);
    const books = await response.json();

    //showing data is retrived
    console.log("Here are the books from the database:", books);

    const productListElement = document.querySelector(".row");
    productListElement.innerHTML = ""; // Clear the existing content

    books.forEach((book) => {
      const card = document.createElement("div");
      card.className = "col justify-content-center";

      card.innerHTML = `
        <a href="/pages/product-details.html?id=${book.id}" class="text-decoration-none text-black">
          
            <div class="card h-100">
              <img src="${book.image_url}" alt="${book.title}" class="card-img-top">
              <div class="card-body bg-brand-light">
                  <h5 class="card-title  lead">${book.title}</h5>
                  <p class="card-text text-muted lead">Price: ${book.price} $</p>
                  <button class="btn  btn-brand mt-auto w-100 ">Add to cart</button>
              </div>
            </div>
            </a>
          `;

      productListElement.appendChild(card); // Append the new card to the product list
    });
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

fetchBooks();
