//  url Parameters 
let params = new URLSearchParams(window.location.search);
let authorId = params.get("id");
let authorname = params.get("name"); 
let searchword = params.get("search") || ""; 

function checkUserAndAddToCart(book) {
  let loggedInUser = localStorage.getItem("user");

  if (loggedInUser) {
    let cart = JSON.parse(localStorage.getItem("myCart")) || [];
    
    const existingItem = cart.find(item => item.id === book.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      // fetching Supabase data to match the Cart variables
      cart.push({ 
        id: book.id,
        title: book.title,
        price: book.price,
        image: book.image_url, 
        author: book.authors ? book.authors.name : "Unknown Author", // Pulls the author name from the joined table
        quantity: 1 
      });
    }

    localStorage.setItem("myCart", JSON.stringify(cart));

    Swal.fire({
      icon: "success",
      title: "Added to cart!",
      text: `${book.title} was added successfully!`,
      confirmButtonColor: "#4A3025",
    });

  } else {
    Swal.fire({
      icon: "error", 
      title: "You have to login first",
      text: "Signup or login to be able to add to cart",
      confirmButtonColor: "#4A3025",
    }).then(() => {
      window.location.href = "../pages/signup.html";
    });
  }
}



const fetchBooks = async () => {
  // adding ,authors(name)  to the URL so Supabase sends the author name from the authors table
  let url = "https://tmlgzmvphyqiygezzgmc.supabase.co/rest/v1/books?select=*,authors(name)";
  
  if (authorId) url += `&author_id=eq.${authorId}`;
  if (authorname) url += `&author_id=eq.${authorname}`;
  if (searchword) url += `&title=eq.${searchword}`;

  const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtbGd6bXZwaHlxaXlnZXp6Z21jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzOTE0NzMsImV4cCI6MjA4Njk2NzQ3M30.21vSjhruvUUu62QddGvNnUgDpCGWoYoQ2aD-CdAL7R8";

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

    const productListElement = document.querySelector(".row");
    productListElement.innerHTML = ""; 

    books.forEach((book) => {
      const card = document.createElement("div");
      
      card.className = "col justify-content-center"; 

      card.innerHTML = `
        <div class="card h-100">
          <a href="/pages/product-details.html?id=${book.id}" class="text-decoration-none text-black">
            <img src="${book.image_url}" alt="${book.title}" class="card-img-top">
          </a>
          <div class="card-body bg-brand-light">
              <a href="/pages/product-details.html?id=${book.id}" class="text-decoration-none text-black">
                <h5 class="card-title lead">${book.title}</h5>
              </a>
              <p class="card-text text-muted lead">Price: ${book.price} $</p>
              
              <button class="btn btn-brand mt-auto w-100 add-to-cart-btn">Add to cart</button>
          </div>
        </div>
      `;

      const myButton = card.querySelector('.add-to-cart-btn');
      myButton.addEventListener('click', function() {
          checkUserAndAddToCart(book);
      });

      productListElement.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

fetchBooks();