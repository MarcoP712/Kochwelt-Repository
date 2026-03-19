const contactForm = document.getElementById("contactForm");
const contactCard = document.getElementById("contactCard");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

const successModal = document.getElementById("successModal");
const closeSuccessModal = document.getElementById("closeSuccessModal");

function setError(input, errorElement, message) {
  input.classList.add("input-error");
  errorElement.textContent = message;
}

function clearError(input, errorElement) {
  input.classList.remove("input-error");
  errorElement.textContent = "";
}

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function validateForm() {
  let isValid = true;

  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const messageValue = messageInput.value.trim();

  clearError(nameInput, nameError);
  clearError(emailInput, emailError);
  clearError(messageInput, messageError);

  if (nameValue === "") {
    setError(nameInput, nameError, "Bitte gib deinen Namen ein.");
    isValid = false;
  }

  if (emailValue === "") {
    setError(emailInput, emailError, "Bitte gib deine E-Mail-Adresse ein.");
    isValid = false;
  } else if (!isValidEmail(emailValue)) {
    setError(emailInput, emailError, "Bitte gib eine gültige E-Mail-Adresse ein.");
    isValid = false;
  }

  if (messageValue === "") {
    setError(messageInput, messageError, "Bitte gib eine Nachricht ein.");
    isValid = false;
  }

  return isValid;
}

function openSuccessModal() {
  contactCard.classList.add("hidden-form");
  successModal.classList.remove("hidden");
}

function closeModalAndResetForm() {
  successModal.classList.add("hidden");
  contactForm.reset();

  clearError(nameInput, nameError);
  clearError(emailInput, emailError);
  clearError(messageInput, messageError);

  setTimeout(() => {
    contactCard.classList.remove("hidden-form");
  }, 180);
}

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  openSuccessModal();
});

closeSuccessModal.addEventListener("click", closeModalAndResetForm);

successModal.addEventListener("click", function (event) {
  if (event.target === successModal) {
    closeModalAndResetForm();
  }
});

nameInput.addEventListener("input", function () {
  if (nameInput.value.trim() !== "") {
    clearError(nameInput, nameError);
  }
});

emailInput.addEventListener("input", function () {
  if (emailInput.value.trim() !== "" && isValidEmail(emailInput.value.trim())) {
    clearError(emailInput, emailError);
  }
});

messageInput.addEventListener("input", function () {
  if (messageInput.value.trim() !== "") {
    clearError(messageInput, messageError);
  }
});