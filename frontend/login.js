const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
})

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
})

// 🆕 LOGIN form handler
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Stop default submit behavior

    const formData = new FormData(loginForm);
    const data = {
      username: formData.get('username'),
      password: formData.get('password')
    };

    try {
      const response = await fetch('https://rfp-proj.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const message = await response.text();
      alert(message); // ✅ Show login result as popup

    } catch (err) {
      alert('❌ Something went wrong.');
      console.error(err);
    }
  });
});


// 🆕 REGISTER form handler
document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');

  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Stop default submit behavior

    const formData = new FormData(registerForm);
    const data = {
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password')
    };

    try {
      const response = await fetch('https://rfp-proj.onrender.com/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const message = await response.text();
      alert(message); // ✅ Show register result as popup

    } catch (err) {
      alert('❌ Registration failed.');
      console.error(err);
    }
  });
});
