document.addEventListener("DOMContentLoaded", function () {
  let headerdiv = document.querySelector(".header");

  if (!headerdiv) {
    console.error("Header div with class 'header' not found");
    return;
  }

  headerdiv.innerHTML = `  
    <div class="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
      <a href="index.html" class="logo d-flex align-items-center text-decoration-none">
        <h1 class="sitename brand-color">BookStore</h1>
      </a>

      <nav class="navbar navbar-expand-lg navmenu">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" href="../index.html">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="../pages/about.html">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="../pages/products.html">Library</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="../pages/authors.html">Authors</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="../pages/contact.html">Contact</a>
              </li>

              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Account
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="../pages/signup.html">Register</a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="../pages/login.html">Login</a>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="../pages/cart.html">Cart <i class="bi bi-cart3 fs-5"></i></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  `;
});
