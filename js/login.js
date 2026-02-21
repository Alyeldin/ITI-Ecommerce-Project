document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault(); // prevent default is prevents the browser from submitting until javascript code is loaded   
  // retrieving data entered by the user
  const emailInput = document.getElementById('exampleInputEmail1').value.trim();
  const passwordInput = document.getElementById('exampleInputPassword1').value.trim();

  // Retrieve the registered users from localStorage
  const users = JSON.parse(localStorage.getItem('user')) || []; 

  // checks for the user that matches the email and pass
  const fooundUser = users.find(user => user.email === emailInput && user.password === passwordInput);

  if (fooundUser) {
    
    Swal.fire({
      icon: 'success',
      title: `Welcome, ${fooundUser.name}`, 
      text: 'You have successfully logged in.',
      confirmButtonText: 'Shop Now',
      confirmButtonColor: '#4A3025'
    }).then((result) => {
      if (result.isConfirmed) {
       window.location.href = "products.html"; // forwarding to the products page
      }
    });
} else {
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: 'Incorrect email or password. Please try again.',
      confirmButtonText: 'Try Again',
      confirmButtonColor: '#4A3025'

        });
  }
});