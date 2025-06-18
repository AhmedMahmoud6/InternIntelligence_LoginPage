import { validateCredentials, triggerNotify } from "./functions.js";

let emailInput = document.querySelector("#email");
let passwordInput = document.querySelector("#password");
let registerBtn = document.querySelector(".sign-up");
let notifyMsg = document.querySelector(".notify");

registerBtn.addEventListener("click", () => {
  const result = validateCredentials(emailInput.value, passwordInput.value);

  emailInput.classList.remove("ring-2", "ring-red-400");
  passwordInput.classList.remove("ring-2", "ring-red-400");
  if (result.isValid) {
    notifyMsg.classList.replace("text-red-300", "text-green-300");
    triggerNotify(notifyMsg, "Account Created Successfully.");
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
