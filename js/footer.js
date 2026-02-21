document.addEventListener("DOMContentLoaded", function () {
  let footerdiv = document.querySelector(".footer");

  if (!footerdiv) {
    console.error("Footer div with class 'footer' not found");
    return;
  }

  footerdiv.innerHTML = `  
      <div class="container">
        <div class="row gy-4 mb-4">
          <div class="col-lg-8">
            <h4 class="brand-color sitename">BookStore</h4>
            <p class="text-muted mt-3">
              Curating the world's best literature for readers across the
              region. Discover your next great adventure with us.
            </p>
          </div>

          <div class="col-lg-4">
            <h5 class="brand-color fw-bold mb-3">Quick Links</h5>
            <div class="row">
              <div class="col-6">
                <ul class="list-unstyled">
                  <li class="mb-2">
                    <a href="../index.html" class="text-decoration-none text-muted"
                      >Home</a
                    >
                  </li>
                  <li class="mb-2">
                    <a
                      href="../pages/about.html"
                      class="text-decoration-none text-muted"
                      >About Us</a
                    >
                  </li>
                  <li class="mb-2">
                    <a
                      href="../pages/products.html"
                      class="text-decoration-none text-muted"
                      >Shop Books</a
                    >
                  </li>
                </ul>
              </div>
              <div class="col-6">
                <ul class="list-unstyled">
                  <li class="mb-2">
                    <a
                      href="../pages/cart.html"
                      class="text-decoration-none text-muted"
                      >Your Cart</a
                    >
                  </li>
                  <li class="mb-2">
                    <a
                      href="../pages/login.html"
                      class="text-decoration-none text-muted"
                      >Login / Register</a
                    >
                  </li>
                  <li class="mb-2">
                    <a
                      href="../pages/contact.html"
                      class="text-decoration-none text-muted"
                      >Contact Us</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center border-top pt-3 mt-3">
          <p class="text-muted small mb-0">
            &copy; 2026 Book Store. All Rights Reserved.
          </p>
        </div>
      </div>
  `;
});
