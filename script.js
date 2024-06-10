document.addEventListener('DOMContentLoaded', () => {
  const adminAccount = {
    username: 'admin',
    password: 'admin123'
  };

  const registerForm = document.getElementById('registrationForm');
  const loginForm = document.getElementById('loginForm');
  const showPasswordCheckbox = document.getElementById('showPassword');
  const forgotPasswordLink = document.getElementById('forgotPassword');
  const logoutButton = document.getElementById('logoutButton');

  // Function to disable the back button
  function disableBackButton() {
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, '', window.location.href);
    };
  }
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const username = document.getElementById('registerUsername').value;
      const email = document.getElementById('registerEmail').value;
      const password = document.getElementById('registerPassword').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      if (!emailRegex.test(email)) {
        alert('Please enter a valid Gmail address');
        return;
      }

      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      if (localStorage.getItem(username) !== null) {
        alert('Username already exists!');
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
        disableBackButton();
        window.location.href = 'https://lornez07.github.io/main/';
      } else {
        const user = JSON.parse(localStorage.getItem(username));
        if (user && user.password === password) {
          localStorage.setItem('loggedUser', username);
          disableBackButton();
          window.location.href = 'https://lornez07.github.io/main/';
        } else {
          alert('Invalid username or password');
        }
      }
    });

    showPasswordCheckbox.addEventListener('change', (event) => {
      const passwordInput = document.getElementById('loginPassword');
      passwordInput.type = event.target.checked ? 'text' : 'password';
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

  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('loggedUser');
      window.location.href = 'index.html';
    });
  }

  const loggedUser = localStorage.getItem('loggedUser');
  if (loggedUser) {
    const usernameSpan = document.getElementById('username');
    if (usernameSpan) {
      usernameSpan.textContent = loggedUser;
    }
  }
});
