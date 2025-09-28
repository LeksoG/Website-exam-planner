// Keep your current form IDs
const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.error) {
    // Show error in your existing error container
    document.getElementById('login-error').textContent = data.error;
  } else {
    // Hide the login form and show dashboard
    loginForm.style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
  }
});

