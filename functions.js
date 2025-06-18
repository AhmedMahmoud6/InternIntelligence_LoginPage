export function validateCredentials(email, password) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{6,}$/;

  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = passwordRegex.test(password);

  return {
    emailValid: isEmailValid,
    passwordValid: isPasswordValid,
    isValid: isEmailValid && isPasswordValid,
  };
}

export function triggerNotify(notifyMsgDiv, notifyMsgText) {
  notifyMsgDiv.textContent = notifyMsgText;
  notifyMsgDiv.classList.remove("hidden");
}

export function getFriendlyErrorMessage(error) {
  if (!error) return "Something went wrong. Please try again.";

  const map = {
    "auth/email-already-in-use": "This email is already in use.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/missing-password": "Please enter a password.",
    "auth/user-not-found": "No account found with this email.",
    "auth/invalid-credential": "Incorrect Email or password. Please try again.",
    "auth/too-many-requests":
      "Too many attempts. Please wait a moment and try again.",
  };

  return map[error] || "An unknown error occurred.";
}
