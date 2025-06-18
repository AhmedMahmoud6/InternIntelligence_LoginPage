import {
  validateCredentials,
  triggerNotify,
  getFriendlyErrorMessage,
} from "./functions.js";
import { loginUser, observeAuthChange, logoutUser } from "./firebaseAuth.js";

let emailInput = document.querySelector("#email");
let passwordInput = document.querySelector("#password");
let loginBtn = document.querySelector(".sign-in");
let notifyMsg = document.querySelector(".notify");
let card = document.querySelector(".card");
let loginDetailsDiv = document.querySelector(".login-details");
let loginSuccess = document.querySelector(".login-success");
let logoutBtn = document.querySelector(".logout");

loginBtn.addEventListener("click", async () => {
  let emailValue = emailInput.value.trim();
  let passwordValue = passwordInput.value.trim();

  const result = validateCredentials(emailValue, passwordValue);

  emailInput.classList.remove("ring-2", "ring-red-400");
  passwordInput.classList.remove("ring-2", "ring-red-400");
  if (result.isValid) {
    let logging = await loginUser(emailValue, passwordValue);
    if (logging.success)
      observeAuthChange((user) => {
        if (user) {
          notifyMsg.classList.replace("text-red-300", "text-green-300");
          triggerNotify(notifyMsg, "Logged In Successfully.");

          setTimeout(() => {
            loginDetailsDiv.classList.add("opacity-0");
          }, 1000);
          setTimeout(() => {
            loginDetailsDiv.classList.add("hidden");
            loginSuccess.classList.remove("hidden");
          }, 1300);
        }
      });
    else {
      notifyMsg.classList.replace("text-green-300", "text-red-300");
      triggerNotify(notifyMsg, getFriendlyErrorMessage(logging.error));
    }
  } else {
    notifyMsg.classList.replace("text-green-300", "text-red-300");

    if (!result.emailValid) {
      triggerNotify(notifyMsg, "Invalid email format");
      emailInput.classList.add("ring-2", "ring-red-400");
    } else if (!result.passwordValid) {
      passwordInput.classList.add("ring-2", "ring-red-400");
      triggerNotify(notifyMsg, "Minimum 6 characters required.");
    }
  }
});

logoutBtn.addEventListener("click", async () => {
  await logoutUser();

  observeAuthChange((user) => {
    if (!user) window.location.replace("index.html");
  });
});
