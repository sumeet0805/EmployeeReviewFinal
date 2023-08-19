const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

loginBtn.addEventListener("click", () => {
  loginForm.classList.add("active-form");
  signupForm.classList.remove("active-form");
});

signupBtn.addEventListener("click", () => {
  signupForm.classList.add("active-form");
  loginForm.classList.remove("active-form");
});