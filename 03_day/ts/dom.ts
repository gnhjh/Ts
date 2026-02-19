export const formInput = {
  fullName: document.getElementById("fullName") as HTMLInputElement,
  email: document.getElementById("email") as HTMLInputElement,
  password: document.getElementById("password") as HTMLInputElement,
  repeatPassword: document.getElementById("repeatPassword") as HTMLInputElement,
};

export const formError = {
  fullName: document.getElementById("fullNameError") as HTMLSpanElement,
  email: document.getElementById("emailError") as HTMLSpanElement,
  password: document.getElementById("passwordError") as HTMLSpanElement,
  repeatPassword: document.getElementById(
    "repeatPasswordError",
  ) as HTMLSpanElement,
};

// Map inputs to their wrapping divs for has-error toggling
export const formGroup = {
  fullName: formInput.fullName.closest(".input-group") as HTMLDivElement,
  email: formInput.email.closest(".input-group") as HTMLDivElement,
  password: formInput.password.closest(".input-group") as HTMLDivElement,
  repeatPassword: formInput.repeatPassword.closest(
    ".input-group",
  ) as HTMLDivElement,
};

export const getFormValues = () => ({
  fullName: formInput.fullName.value.trim(),
  email: formInput.email.value.trim(),
  password: formInput.password.value.trim(),
  repeatPassword: formInput.repeatPassword.value.trim(),
});
