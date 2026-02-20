
let cartItems = JSON.parse(localStorage.getItem('myCart')) || []; // retriving  the data stoerd in localStorage 

// HTML tags that will be used to inject the  data retrived from the local storage 
const checkoutList = document.getElementById('checkout-items-list');
const checkoutSubtotal = document.getElementById('checkout-subtotal');
const checkoutTotal = document.getElementById('checkout-total');

if (cartItems.length === 0) {
    alert("Your cart is empty. Let's find some books!");
    window.location.assign("products.html"); // I used assign to allow the user to go back in the history 
}


// itemsHTML will map over all books stored in cartItem and apply the html func over it 
const itemsHTML = cartItems.map(item => `
    <li class="list-group-item d-flex justify-content-between lh-sm bg-transparent px-0 border-secondary-subtle">
        <div>
            <h6 class="my-0 brand-color fw-bold">${item.title}</h6>
            <small class="text-muted">Qty: ${item.quantity}</small>
        </div>
        <span class="text-muted">${(item.price * item.quantity).toFixed(2)} EGP</span>
    </li>
`).join(''); 

// now adding it to the HTML page 
checkoutList.innerHTML = itemsHTML;

const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

checkoutSubtotal.innerText = `${totalAmount.toFixed(2)} EGP`; // toFixed adds ,00 2 decimal to the price 
checkoutTotal.innerText = `${totalAmount.toFixed(2)} EGP`;




const creditRadio = document.getElementById('credit');
const cashRadio = document.getElementById('cash');
const cardDetailsArea = document.getElementById('cardDetailsArea');
const cardInputs = cardDetailsArea.querySelectorAll('input'); 

// this function  switches the view so when a user press on credit the credite input will appear
function paymentMethodForm() {
    if (cashRadio.checked) {
        cardDetailsArea.classList.add('d-none');// in case  cash is selected card form will disappear 
        cardInputs.forEach(input => input.removeAttribute('required')); 
    } else {
        
        cardDetailsArea.classList.remove('d-none');
        cardInputs.forEach(input => input.setAttribute('required', 'true'));
    }
}

creditRadio.addEventListener('change', paymentMethodForm);// everytime the user selects the payment method this function will run
cashRadio.addEventListener('change', paymentMethodForm);

//Form validation 

const checkoutForm = document.getElementById('checkoutForm');// storing the entire from using id checkoutFrom

//  an event listener wehn the user subimt the order this function will be excuted 
checkoutForm.addEventListener('submit', function(event) {
    
    event.preventDefault(); 
    
    // It looks at all the "required" tags we put in the HTML
    if (checkoutForm.checkValidity() === false) {
        
        // if the user inserted invalid date the was-validated class will be added to the form
        event.stopPropagation();
        checkoutForm.classList.add('was-validated');
        
    } else {
        
        // if the data is valid an alert will pop and then clear localStorage and direct the user to the products page
        alert("Order placed successfully! Thank you for shopping with us.");
        
        localStorage.clear();
        
        window.location.href = "/pages/products.html"; 
    }
});