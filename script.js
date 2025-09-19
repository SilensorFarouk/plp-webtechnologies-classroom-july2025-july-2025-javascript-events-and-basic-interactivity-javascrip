// script.js

// ------------------------------
// Part 1: Event Handling & Interactive Elements
// ------------------------------

// Dark Mode Toggle
const modeToggleBtn = document.getElementById('modeToggle');
modeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  modeToggleBtn.textContent = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
});

// Tabbed Interface
const tabs = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.tab-panel');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    // Deactivate all tabs and hide all panels
    tabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
      t.setAttribute('tabindex', '-1');
    });
    panels.forEach(p => {
      p.hidden = true;
      p.classList.remove('active');
    });

    // Activate clicked tab and show corresponding panel
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');
    const panelId = tab.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);
    panel.hidden = false;
    panel.classList.add('active');
    tab.focus();
  });

  // Keyboard navigation for tabs (left/right arrows)
  tab.addEventListener('keydown', (e) => {
    let index = Array.from(tabs).indexOf(e.target);
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (index + 1) % tabs.length;
      tabs[nextIndex].click();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (index - 1 + tabs.length) % tabs.length;
      tabs[prevIndex].click();
    }
  });
});

// ------------------------------
// Part 3: Form Validation
// ------------------------------

const form = document.getElementById('registrationForm');

const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('emailAddress');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

const fullNameError = document.getElementById('fullNameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

const formMessage = document.getElementById('formMessage');

/**
 * Validate email format using regex
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Validate password strength:
 * Minimum 8 characters, at least one uppercase, one lowercase, and one digit
 * @param {string} password
 * @returns {boolean}
 */
function isValidPassword(password) {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return re.test(password);
}

/**
 * Clear all error messages
 */
function clearErrors() {
  fullNameError.textContent = '';
  emailError.textContent = '';
  passwordError.textContent = '';
  confirmPasswordError.textContent = '';
  formMessage.textContent = '';
}

/**
 * Validate form fields and show errors if any
 * @returns {boolean} true if valid, false otherwise
 */
function validateForm() {
  clearErrors();
  let valid = true;

  const fullName = fullNameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (fullName === '') {
    fullNameError.textContent = 'Full name is required.';
    valid = false;
  }

  if (email === '') {
    emailError.textContent = 'Email address is required.';
    valid = false;
  } else if (!isValidEmail(email)) {
    emailError.textContent = 'Please enter a valid email address.';
    valid = false;
  }

  if (password === '') {
    passwordError.textContent = 'Password is required.';
    valid = false;
  } else if (!isValidPassword(password)) {
    passwordError.textContent = 'Password must be at least 8 characters, include uppercase, lowercase, and a number.';
    valid = false;
  }

  if (confirmPassword !== password) {
    confirmPasswordError.textContent = 'Passwords do not match.';
    valid = false;
  }

  return valid;
}

// Real-time validation on input events for better UX
fullNameInput.addEventListener('input', () => {
  if (fullNameInput.value.trim() === '') {
    fullNameError.textContent = 'Full name is required.';
  } else {
    fullNameError.textContent = '';
  }
});

emailInput.addEventListener('input', () => {
  if (emailInput.value.trim() === '') {
    emailError.textContent = 'Email address is required.';
  } else if (!isValidEmail(emailInput.value.trim())) {
    emailError.textContent = 'Please enter a valid email address.';
  } else {
    emailError.textContent = '';
  }
});

passwordInput.addEventListener('input', () => {
  if (passwordInput.value === '') {
    passwordError.textContent = 'Password is required.';
  } else if (!isValidPassword(passwordInput.value)) {
    passwordError.textContent = 'Password must be at least 8 characters, include uppercase, lowercase, and a number.';
  } else {
    passwordError.textContent = '';
  }
});

confirmPasswordInput.addEventListener('input', () => {
  if (confirmPasswordInput.value !== passwordInput.value) {
    confirmPasswordError.textContent = 'Passwords do not match.';
  } else {
    confirmPasswordError.textContent = '';
  }
});

// Form submission handler
form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (validateForm()) {
    formMessage.style.color = '#188038';
    formMessage.textContent = 'Registration successful! 🎉';
    form.reset();
  } else {
    formMessage.style.color = '#d93025';
    formMessage.textContent = 'Please fix the errors above and try again.';
  }
});