const fetchBooks = async () => {
  const url = "https://tmlgzmvphyqiygezzgmc.supabase.co/rest/v1/books?select=*";
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
    console.log("Here are the books from the database:", books);

    //trial aly
    const productListElement = document.querySelector(".row");
    productListElement.innerHTML = ""; // Clear the existing content

    books.forEach((book) => {
      console.log("hena bengarab tany ", book);
      const card = document.createElement("div"); // Correctly create a new div for each product
      card.className = "card h-100"; // Ensure each product is a card element
      card.innerHTML = `
            <img src="${book.image_url}" alt="${book.title}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text">${book.price}</p>
                <button class="btn btn-primary">Buy</button>
            </div>
        `;
      productListElement.appendChild(card); // Append the new card to the product list
    });

    // You can start looping through 'books' here to create your HTML cards
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

fetchBooks();
