      const fetchAuthors = async () => {
        // api returnes the JSON from the authors table supabase
        const url = 'https://tmlgzmvphyqiygezzgmc.supabase.co/rest/v1/authors?select=*';
        const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtbGd6bXZwaHlxaXlnZXp6Z21jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzOTE0NzMsImV4cCI6MjA4Njk2NzQ3M30.21vSjhruvUUu62QddGvNnUgDpCGWoYoQ2aD-CdAL7R8';

        const options = {
          method: 'GET',
          headers: {
            'apikey': anonKey,
            'Authorization': `Bearer ${anonKey}`,
            'Content-Type': 'application/json'
          }
        };

        try {
          const response = await fetch(url, options);
          const authors = await response.json();
          
          const container = document.getElementById('authors-container');
          container.innerHTML = ''; 

          const authorsHTML = authors.map(author => `
            <div class="col">
              <div class="card h-100 border-0 shadow-sm text-center p-4">
                
                <div class="mb-3">
                  <img src="${author.image_url}" alt="${author.name}" class="rounded-circle shadow-sm" style="width: 120px; height: 120px; object-fit: cover;">
                </div>
                
                <div class="card-body p-0 d-flex flex-column">
                  <h4 class="card-title fw-bold brand-color mb-1">${author.name}</h4>
                  <p class="text-muted small mb-3">${author.age} Years Old</p>
                  
                  <p class="card-text text-secondary mb-4" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                    ${author.description}
                  </p>
                  
                  <div class="mt-auto">
                    <a href="/pages/products.html" class="btn btn-brand w-100 py-2 rounded-pill">View Their Books</a>
                  </div>
                </div>

              </div>
            </div>
          `).join(''); 

          container.innerHTML = authorsHTML;

        } catch (error) {
          console.error("Error fetching authors:", error);
          document.getElementById('authors-container').innerHTML = `
            <div class="col-12 text-center text-danger my-5">
              <h5>Failed to load authors. Please try again later.</h5>
            </div>
          `;
        }
      };

      fetchAuthors();