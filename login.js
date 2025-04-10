const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
})

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
})
// Toggle password visibility function
function togglePassword(inputId, icon) {
    const passwordInput = document.getElementById(inputId);
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.replace('bxs-show', 'bxs-hide');
    } else {
        passwordInput.type = 'password';
        icon.classList.replace('bxs-hide', 'bxs-show');
    }
}

// Make sure to keep your existing toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    const registerBtn = document.querySelector('.register-btn');
    const loginBtn = document.querySelector('.login-btn');
    
    registerBtn.addEventListener('click', () => {
        container.classList.add('active');
    });
    
    loginBtn.addEventListener('click', () => {
        container.classList.remove('active');
    });
});
