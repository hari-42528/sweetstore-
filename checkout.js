document.getElementById('checkout-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // Retrieve form values
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();

  // Basic validation
  if (!name || !email || !phone || !address) {
    alert('Please fill in all fields.');
    return;
  }

  // Proceed to payment integration
  // You can pass these details to your payment gateway here
});
