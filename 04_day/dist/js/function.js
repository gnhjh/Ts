import { formError, formGroup, formInput } from "./dom.js";
import { User } from "./service.js";
import { Utils } from "./utils.js";
export const getFormValues = () => ({
    fullName: formInput.fullName.value.trim(),
    email: formInput.email.value.trim(),
    password: formInput.password.value.trim(),
    repeatPassword: formInput.repeatPassword.value.trim(),
});
// Validate inputs and return errors
export const validate = (values) => {
    const errors = {};
    if (!Utils.validName(values.fullName)) {
        errors.fullName = "Name must be 3+ characters";
    }
    if (!Utils.validEmail(values.email)) {
        errors.email = "Invalid email address";
    }
    if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    }
    if (values.password !== values.repeatPassword) {
        errors.repeatPassword = "Passwords do not match";
    }
    return Object.keys(errors).length ? errors : null;
};
export const showErrors = (errors) => {
    Object.keys(formInput).forEach((key) => {
        const container = formGroup[key];
        const errorSpan = formError[key];
        const message = errors?.[key];
        if (message) {
            container.classList.add("has-error");
            errorSpan.textContent = message;
        }
        else {
            container.classList.remove("has-error");
            errorSpan.textContent = "";
        }
    });
};
export const createUser = (values) => {
    return new User(values.fullName, values.email, values.password);
};
//# sourceMappingURL=function.js.map