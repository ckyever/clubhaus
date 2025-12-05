const password = document.getElementById("password");
const passwordConfirmation = document.getElementById("confirm-password");
const passwordConfirmationInfo = document.getElementById(
  "confirm-password-info"
);

const handlePasswordChanges = (password, passwordConfirmation) => {
  if (passwordConfirmation.length === 0) {
    passwordConfirmationInfo.innerText = "";
  } else {
    if (passwordConfirmation === password) {
      passwordConfirmationInfo.innerText = "Matching ✅";
    } else {
      passwordConfirmationInfo.innerText = "Passwords do not match ⛔";
    }
  }
};

password.addEventListener("input", () => {
  passwordConfirmation.value = "";
  passwordConfirmationInfo.textContent = "";
});

passwordConfirmation.addEventListener("input", (event) => {
  handlePasswordChanges(password.value, event.target.value);
});
