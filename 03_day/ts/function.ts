import { formError, formGroup, formInput, getFormValues } from "./dom.js";
import type { UserList } from "./service.js";
import type { FormErrors, FormValues } from "./types.js";
import { Utils } from "./utils.js";

// Validate inputs and return errors
export const getValidationError = (
  values: FormValues,
  isEmailExists: boolean,
) => {
  const errors: FormErrors = {};

  if (!Utils.validName(values.fullName)) {
    errors.fullName = "Name must be 3+ characters";
  }

  if (!Utils.validEmail(values.email)) {
    errors.email = "Invalid email address";
  }

  if (isEmailExists) {
    errors.email = "Email Arleady Exists";
  }

  if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (values.password !== values.repeatPassword) {
    errors.repeatPassword = "Passwords do not match";
  }

  return errors;
};

export const showError = (errors: FormErrors) => {
  (Object.keys(formInput) as (keyof typeof formInput)[]).forEach((key) => {
    const inputContainer = formGroup[key];
    const errorSpan = formError[key];

    if (errors[key]) {
      inputContainer.classList.add("has-error");
      errorSpan.textContent = errors[key];
    } else {
      inputContainer.classList.remove("has-error");
      errorSpan.textContent = "";
    }
  });
};
