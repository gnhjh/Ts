import { formError, formGroup, formInput, getFormValues } from "./dom.js";
import { Utils } from "./utils.js";
// Validate inputs and return errors
export const getValidationError = (values, isEmailExists) => {
    const errors = {};
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
export const showError = (errors) => {
    Object.keys(formInput).forEach((key) => {
        const inputContainer = formGroup[key];
        const errorSpan = formError[key];
        if (errors[key]) {
            inputContainer.classList.add("has-error");
            errorSpan.textContent = errors[key];
        }
        else {
            inputContainer.classList.remove("has-error");
            errorSpan.textContent = "";
        }
    });
};
//# sourceMappingURL=function.js.map