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
