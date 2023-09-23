const showPassword = document.querySelector("#show-password");
const passwordField = document.querySelector("#password");

showPassword.addEventListener("click", function () {
  this.classList.toggle("fa-eye-slash");
  const type =
    passwordField.getAttribute("type") === "password" ? "text" : "password";
  passwordField.setAttribute("type", type);
});

const showConPassword = document.querySelector("#show-confirm-password");
const ConpasswordField = document.querySelector("#confirm-password");

showConPassword.addEventListener("click", function () {
  this.classList.toggle("fa-eye-slash");
  const type =
    ConpasswordField.getAttribute("type") === "password" ? "text" : "password";
  ConpasswordField.setAttribute("type", type);
});
