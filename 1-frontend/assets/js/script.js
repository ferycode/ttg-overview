const form = document.querySelector('form');

const handleError = (field, errorMsg) => {
  field.classList.add('error');
  const errorELement = document.createElement('span');
  errorELement.classList.add('error-message');
  errorELement.innerText = errorMsg;
  field.closest('.form-group').appendChild(errorELement);
}

const removeErrors = () => {
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(error => error.remove());
  
  const errorInputs = document.querySelectorAll('.error');
  errorInputs.forEach(input => input.classList.remove('error'));
}

const handleFormSubmit = (e) => {
  e.preventDefault();  
  removeErrors();

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirm-password');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const passwordRegex = /^.{8,}$/;

  if (name === '') {
    handleError(nameInput, 'Nama tidak boleh kosong');
  }

  if (email === '') {
    handleError(emailInput, 'Email tidak boleh kosong');
  } else if (!emailRegex.test(email)) {
    handleError(emailInput, 'Email tidak valid');
  }

  if (password === '') {
    handleError(passwordInput, 'Password tidak boleh kosong');
  } else if (!passwordRegex.test(password)) {
    handleError(passwordInput, 'Password minimal 8 karakter');
  }

  if (confirmPassword === '') {
    handleError(confirmPasswordInput, 'Konfirmasi password tidak boleh kosong');
  } else if (confirmPassword !== password) {
    handleError(confirmPasswordInput, 'Konfirmasi password tidak sama');
  }

  const errors = document.querySelectorAll('.error-message');
  if (errors.length > 0) {
    return;
  }

  const alert = document.querySelector('.alert');
  alert.style.display = 'block';
  
  form.reset();
  
  setTimeout(() => {
    alert.style.display = 'none';
  }, 5000);
}

form.addEventListener('submit', handleFormSubmit);