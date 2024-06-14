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

  function disableBackButton() {
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, '', window.location.href);
    };
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  function isUniqueUsernameEmail(username, email) {
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        const user = JSON.parse(localStorage.getItem(key));
        if (user && (user.username === username || user.email === email)) {
          return false;
        }
      }
    }
    return true;
  }

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

      if (!isUniqueUsernameEmail(username, email)) {
        alert('Username or email already exists!');
        return;
      }

      const newUser = { username, email, password };
      localStorage.setItem(username, JSON.stringify(newUser));
      alert('Registration successful!');
      window.location.href = 'index.html';
    });

    const passwordInput = document.getElementById('registerPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordIcon = document.querySelector('.password-icon');
    const confirmPasswordIcon = document.querySelector('.confirm-password-icon');

    passwordIcon.addEventListener('click', () => {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordIcon.classList.add('bx-show');
        passwordIcon.classList.remove('bx-hide');
      } else {
        passwordInput.type = 'password';
        passwordIcon.classList.add('bx-hide');
        passwordIcon.classList.remove('bx-show');
      }
    });

    confirmPasswordIcon.addEventListener('click', () => {
      if (confirmPasswordInput.type === 'password') {
        confirmPasswordInput.type = 'text';
        confirmPasswordIcon.classList.add('bx-show');
        confirmPasswordIcon.classList.remove('bx-hide');
      } else {
        confirmPasswordInput.type = 'password';
        confirmPasswordIcon.classList.add('bx-hide');
        confirmPasswordIcon.classList.remove('bx-show');
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const username = document.getElementById('loginUsername').value;
      const password = document.getElementById('loginPassword').value;

      if (username === adminAccount.username && password === adminAccount.password) {
        sessionStorage.setItem('loggedUser', username);
        disableBackButton();
        alert('Logged in Successfully!');
        window.location.href = 'welcome.html';
      } else {
        const user = JSON.parse(localStorage.getItem(username));
        if (user && user.password === password) {
          sessionStorage.setItem('loggedUser', username);
          disableBackButton();
          alert('Logged in Successfully!');
          window.location.href = 'welcome.html';
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
      sessionStorage.removeItem('loggedUser');
      window.location.href = 'index.html';
      window.history.pushState(null, '', 'index.html');
      window.history.pushState(null, '', 'index.html');
      window.onpopstate = function () {
        window.location.href = 'index.html';
      };
    });
  }

  const loggedUser = sessionStorage.getItem('loggedUser');
  if (loggedUser) {
    const usernameSpan = document.getElementById('username');
    if (usernameSpan) {
      usernameSpan.textContent = loggedUser;
    }
  }
});
