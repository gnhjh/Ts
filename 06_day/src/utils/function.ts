import { formError, formGroup, formInput } from "./dom.js";
import { User } from "../service/service.js";
import type { FormErrors, FormValues } from "../types/types.js";
import { Utils } from "../service/utils.js";

export const getFormValues = () => ({
  fullName: formInput.fullName.value.trim(),
  email: formInput.email.value.trim(),
  password: formInput.password.value.trim(),
  repeatPassword: formInput.repeatPassword.value.trim(),
});

// Validate inputs and return errors
export const validate = (
  values: FormValues,
  checkEmailExists?: (email: string) => boolean, // ← callback
): FormErrors | null => {
  const errors: FormErrors = {};

  if (!Utils.validName(values.fullName)) {
    errors.fullName = "Name must be 3+ characters";
  }

  if (!Utils.validEmail(values.email)) {
    errors.email = "Invalid email address";
  } else if (checkEmailExists && checkEmailExists(values.email)) {
    errors.email = "Email already exists";
  }

  if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (values.password !== values.repeatPassword) {
    errors.repeatPassword = "Passwords do not match";
  }

  return Object.keys(errors).length ? errors : null;
};

// Validate single field (for live validation)
export const validateField = (
  fieldName: keyof FormValues,
  value: string,
  allValues?: FormValues, // ← חזר למקום המקורי
  checkEmailExists?: (email: string) => boolean, // ← אחרון
): string | null => {
  switch (fieldName) {
    case "fullName":
      return !Utils.validName(value) ? "Name must be 3+ characters" : null;

    case "email":
      if (!Utils.validEmail(value)) {
        return "Invalid email address";
      }
      // ✅ בדיקת email קיים
      if (checkEmailExists && checkEmailExists(value)) {
        return "Email already exists";
      }
      return null;

    case "password":
      return value.length < 6 ? "Password must be at least 6 characters" : null;

    case "repeatPassword":
      if (allValues && value !== allValues.password) {
        return "Passwords do not match";
      }
      return null;

    default:
      return null;
  }
};

export const showErrors = (errors: FormErrors | null): void => {
  (Object.keys(formInput) as (keyof typeof formInput)[]).forEach((key) => {
    const container = formGroup[key];
    const errorSpan = formError[key];

    const message = errors?.[key];

    if (message) {
      container.classList.add("has-error");
      errorSpan.textContent = message;
    } else {
      container.classList.remove("has-error");
      errorSpan.textContent = "";
    }
  });
};

export const showFieldError = (
  fieldName: keyof typeof formInput,
  error: string | null,
): void => {
  const container = formGroup[fieldName];
  const errorSpan = formError[fieldName];

  if (error) {
    container.classList.add("has-error");
    errorSpan.textContent = error;
  } else {
    container.classList.remove("has-error");
    errorSpan.textContent = "";
  }
};

export const createUser = (values: FormValues): User => {
  return new User(values.fullName, values.email, values.password);
};
