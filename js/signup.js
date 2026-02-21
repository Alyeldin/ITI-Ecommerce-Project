


const registerForm = document.getElementById('registerForm');
const nameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

let usersList = JSON.parse(localStorage.getItem('user')) || []; // usersList retrive user data from local storage 



registerForm.addEventListener('submit', function(event) {
    event.preventDefault(); // to stop the page from refreshing 
    
    
    const nameValue = nameInput.value.trim(); 
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value;
    const confirmPasswordValue = confirmPasswordInput.value;

    let isValid = true; //  assume the form's data is valid until  it is false

    // removes all Bootstrap validation classes before checking
    registerForm.classList.remove('was-validated');

    // Check if the password is at least 8 characters
    if (passwordValue.length < 8) {
        passwordInput.setCustomValidity("Invalid"); //  Bootstrap  flags this input
        isValid = false;
    } else {
        passwordInput.setCustomValidity(""); // Clears the error
    }

    // Check if the passwords match
    if (passwordValue !== confirmPasswordValue || confirmPasswordValue === "") {
        confirmPasswordInput.setCustomValidity("Invalid");
        isValid = false;
    } else {
        confirmPasswordInput.setCustomValidity("");
    }
//  turns the boxes red
    if (!registerForm.checkValidity() || !isValid) {
         
        event.stopPropagation();
        registerForm.classList.add('was-validated');
        return; 
    }

    saveUser(nameValue, emailValue, passwordValue);
});


// func to sotre user data into a localsotrage 
function saveUser(name, email, password) {
    
    // first checks if the email is already in the localstorage or not 
    const userExists = usersList.find(user => user.email === email);
    
    if (userExists) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'This email is already registered. Please log in instead.',
            confirmButtonColor: '#4A3025' 
        });
        return; // stop the function so it does not create a duplicate account
    }
    let nextId = usersList.length + 1;
    const newUser = {
        userID: nextId, // Cool trick: Uses the exact millisecond of right now as a unique ID!
        name: name,
        email: email,
        password: password 
    };

    usersList.push(newUser);

    localStorage.setItem('user', JSON.stringify(usersList));// save it bakck in the localstorage

    Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: `Welcome to the bookstore, ${name}!`,
        confirmButtonText: 'Shop Now',
        confirmButtonColor: '#4A3025' 
    }).then(() => { // this block will excute after the sweet alert 
        window.location.href = "products.html"; // forwarding to the products page 
    });
    
}
