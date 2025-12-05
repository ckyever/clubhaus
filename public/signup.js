const passwordInput = document.getElementById("password");
const passwordConfirmationInput = document.getElementById("confirm-password");
const passwordConfirmationInfo = document.getElementById(
  "confirm-password-info"
);

const validatePasswords = (password, passwordConfirmation) => {
  if (passwordConfirmation.length === 0) {
    passwordConfirmationInfo.innerText = "";
  } else {
    if (passwordConfirmation === password) {
      passwordConfirmationInfo.innerText = "Matching ✅";
      passwordConfirmationInput.setCustomValidity("");
    } else {
      passwordConfirmationInfo.innerText = "Passwords do not match ⛔";
      passwordConfirmationInput.setCustomValidity("Passwords must match");
    }
  }
};

passwordInput.addEventListener("input", () => {
  passwordConfirmationInput.value = "";
  passwordConfirmationInfo.textContent = "";
});

passwordConfirmationInput.addEventListener("input", (event) => {
  validatePasswords(passwordInput.value, event.target.value);
});
