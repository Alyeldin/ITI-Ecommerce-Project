// dummy data for testing
const dummyCart = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    price: 1065.00,
    image: "https://m.media-amazon.com/images/I/81YkqyaFVEL.jpg",
    quantity: 1
  },

  {
    id: 2,
    title: "Verity",
    author: "Colleen Hoover",
    price: 850.50,
    image: "https://m.media-amazon.com/images/I/41d1gVUK1yL.jpg",
    quantity: 2
  }
];

if (localStorage.getItem('myCart') === null) {
  localStorage.setItem('myCart', JSON.stringify(dummyCart));
}

// retrieving  cart data from loacal storage 
let cartItems = JSON.parse(localStorage.getItem('myCart')) || []; // in case noting in the local storage it will return an empty []

const cartContainer = document.getElementById('cart-items-container');
const cartCountElement = document.getElementById('cart-count');

function updateCartCount() {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.innerText = totalItems;
}

function renderCart() {
    // update the count at the top of the page
    updateCartCount();
    updateTotals();

    // If the cart is empty it will show a friendly message
    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<div class="text-center py-5"><h5 class="text-muted">Your cart is empty.</h5><a href="products.html" class="btn btn-brand mt-3">Continue Shopping</a></div>';
        return; // stop running the rest of the code
    }

    // Loop over the array and build the HTML
    const cartHTML = cartItems.map(item => `
        <div class="row align-items-center mb-4 pb-4 border-bottom"> 
            
            <div class="col-4 col-md-2 text-center">
                <img src="${item.image}" alt="${item.title}" class="img-fluid rounded" style="max-height: 100px; object-fit: contain;">
            </div>
            
            <div class="col-8 col-md-4">
                <h5 class="mb-1 brand-color">${item.title}</h5>
                <p class="text-muted small mb-0">${item.author}</p>
            </div>
            
            <div class="col-6 col-md-3 mt-3 mt-md-0 d-flex align-items-center">
                <button onclick="changeQuantity(${item.id}, -1)" class="btn btn-sm btn-outline-secondary px-2">-</button>
                
                <input type="number" class="form-control form-control-sm text-center mx-2" value="${item.quantity}" readonly style="width: 50px;">
                
                <button onclick="changeQuantity(${item.id}, 1)" class="btn btn-sm btn-outline-secondary px-2">+</button>
            </div>
            
            <div class="col-6 col-md-3 mt-3 mt-md-0 d-flex justify-content-between align-items-center">
                <span class="brand-color fw-bold">${(item.price * item.quantity).toFixed(2)} EGP</span> 
                
                <button onclick="removeItem(${item.id})" class="btn btn-sm text-danger"><i class="bi bi-trash3 fs-6"></i></button>
            </div>
            
        </div>
    `).join(''); 

   
    cartContainer.innerHTML = cartHTML; // this will add the final string into the HTML div cartContainer
}
renderCart();

function updateTotals() { 
    const subtotalElement = document.getElementById('cart-subtotal');
    const totalElement = document.getElementById('cart-total');

    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    subtotalElement.innerText = `${totalAmount.toFixed(2)} EGP`;
    totalElement.innerText = `${totalAmount.toFixed(2)} EGP`;
}

function changeQuantity(id, amount) {
    const item = cartItems.find(book => book.id === id);

    if (item) {
        item.quantity += amount;

        if (item.quantity < 1) { 
            item.quantity = 1;
        }

        
        localStorage.setItem('myCart', JSON.stringify(cartItems));

        renderCart(); 
    }
}

function removeItem(id) {
    cartItems = cartItems.filter(book => book.id !== id); // to keep all book except the one only teh user cliked on 

    localStorage.setItem('myCart', JSON.stringify(cartItems));

    renderCart(); // to redraw the cart agian 
}
