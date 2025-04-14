const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
})

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
})

// // 🆕 LOGIN form handler
// document.addEventListener('DOMContentLoaded', () => {
//   const loginForm = document.getElementById('loginForm');

//   loginForm.addEventListener('submit', async (e) => {
//     e.preventDefault(); // Stop default submit behavior

//     const formData = new FormData(loginForm);
//     const data = {
//       username: formData.get('username'),
//       password: formData.get('password')
//     };

//     try {
//       const response = await fetch('https://rfp-proj.onrender.com/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data)
//       });

//       const message = await response.text();
//       alert(message); // ✅ Show login result as popup

//     } catch (err) {
//       alert('❌ Something went wrong.');
//       console.error(err);
//     }
//   });
// });


// // 🆕 REGISTER form handler
// document.addEventListener('DOMContentLoaded', () => {
//   const registerForm = document.getElementById('registerForm');

//   registerForm.addEventListener('submit', async (e) => {
//     e.preventDefault(); // Stop default submit behavior

//     const formData = new FormData(registerForm);
//     const data = {
//       username: formData.get('username'),
//       email: formData.get('email'),
//       password: formData.get('password')
//     };

//     try {
//       const response = await fetch('https://rfp-proj.onrender.com/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data)
//       });

//       const message = await response.text();
//       alert(message); // ✅ Show register result as popup

//     } catch (err) {
//       alert('❌ Registration failed.');
//       console.error(err);
//     }
//   });
// });


// Show popup
function showPopup(message) {
  const popup = document.getElementById("popup");
  const messageBox = document.getElementById("popup-message");
  messageBox.innerText = message;
  popup.classList.remove("hidden");
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}

// Login Submit
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const res = await fetch('https://rfp-proj.onrender.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    showPopup(data.message);
  } catch (err) {
    console.error(err);
    showPopup('❌ Login failed. Please try again later.');
  }
});

// Register Submit
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('registerUsername').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  try {
    const res = await fetch('https://rfp-proj.onrender.com/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    const data = await res.json();
    showPopup(data.message);
  } catch (err) {
    console.error(err);
    showPopup('❌ Registration failed. Please try again later.');
  }
});

function closePopup() {
  document.getElementById("popup").classList.add("hidden");

  // Reset both forms after popup closes
  document.getElementById("loginForm").reset();
  document.getElementById("registerForm").reset();
}
let lastForm = null; // track which form was submitted

// Login Submit
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  lastForm = 'login';
  // rest of the code...
});

// Register Submit
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  lastForm = 'register';
  // rest of the code...
});

function closePopup() {
  document.getElementById("popup").classList.add("hidden");

  // Reset only the last used form
  if (lastForm === 'login') {
    document.getElementById("loginForm").reset();
  } else if (lastForm === 'register') {
    document.getElementById("registerForm").reset();
  }
}


// const container = document.querySelector('.container');
// const registerBtn = document.querySelector('.register-btn');
// const loginBtn = document.querySelector('.login-btn');

// registerBtn.addEventListener('click', () => {
//     container.classList.add('active');
// });

// loginBtn.addEventListener('click', () => {
//     container.classList.remove('active');
// });

// // LOGIN
// document.getElementById('loginForm')?.addEventListener('submit', async function (e) {
//     e.preventDefault();

//     const username = this.username.value;
//     const password = this.password.value;

//     try {
//         const res = await fetch('https://rfp-proj.onrender.com/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ username, password })
//         });

//         const message = await res.text();
//         alert(message);
//     } catch (err) {
//         console.error('❌ Login Error:', err);
//         alert('❌ Login failed.');
//     }
// });

// // REGISTER
// document.getElementById('registerForm')?.addEventListener('submit', async function (e) {
//     e.preventDefault();

//     const username = this.username.value;
//     const email = this.email.value;
//     const password = this.password.value;

//     try {
//         const res = await fetch('https://rfp-proj.onrender.com/register', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ username, email, password })
//         });

//         const message = await res.text();
//         alert(message);
//     } catch (err) {
//         console.error('❌ Registration Error:', err);
//         alert('❌ Registration failed.');
//     }
// });
