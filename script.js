document.addEventListener('DOMContentLoaded', () => {
  const adminAccount = {
    username: 'admin',
    password: 'admin123'
  };

  const registerForm = document.getElementById('registrationForm');
  const loginForm = document.getElementById('loginForm');
  const showPasswordCheckbox = document.getElementById('showPassword');
  const forgotPasswordLink = document.getElementById('forgotPassword');

  if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const username = document.getElementById('registerUsername').value;
      const email = document.getElementById('registerEmail').value;
      const password = document.getElementById('registerPassword').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      const newUser = { username, email, password };
      localStorage.setItem(username, JSON.stringify(newUser));
      alert('Registration successful!');
      window.location.href = 'index.html';
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const username = document.getElementById('loginUsername').value;
      const password = document.getElementById('loginPassword').value;

      if (username === adminAccount.username && password === adminAccount.password) {
        localStorage.setItem('loggedUser', username);
        window.location.href = 'https://lornez07.github.io/main/index.html';
      } else {
        const user = JSON.parse(localStorage.getItem(username));
        if (user && user.password === password) {
          localStorage.setItem('loggedUser', username);
          window.location.href = 'https://lornez07.github.io/main/index.html';
        } else {
          alert('Invalid username or password');
        }
      }
    });

    showPasswordCheckbox.addEventListener('change', (event) => {
      const passwordInput = document.getElementById('loginPassword');
      if (event.target.checked) {
        passwordInput.type = 'text';
      } else {
        passwordInput.type = 'password';
      }
    });

    forgotPasswordLink.addEventListener('click', (event) => {
      event.preventDefault();
      const username = prompt('Enter your username:');
      if (username) {
        const user = JSON.parse(localStorage.getItem(username));
        if (user) {
          alert(`Your password is: ${user.password}`);
        } else {
          alert('Username not found!');
        }
      }
    });
  }
});
