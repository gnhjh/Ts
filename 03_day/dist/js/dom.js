export const formInput = {
    fullName: document.getElementById("fullName"),
    email: document.getElementById("email"),
    password: document.getElementById("password"),
    repeatPassword: document.getElementById("repeatPassword"),
};
export const formError = {
    fullName: document.getElementById("fullNameError"),
    email: document.getElementById("emailError"),
    password: document.getElementById("passwordError"),
    repeatPassword: document.getElementById("repeatPasswordError"),
};
// Map inputs to their wrapping divs for has-error toggling
export const formGroup = {
    fullName: formInput.fullName.closest(".input-group"),
    email: formInput.email.closest(".input-group"),
    password: formInput.password.closest(".input-group"),
    repeatPassword: formInput.repeatPassword.closest(".input-group"),
};
export const getFormValues = () => ({
    fullName: formInput.fullName.value.trim(),
    email: formInput.email.value.trim(),
    password: formInput.password.value.trim(),
    repeatPassword: formInput.repeatPassword.value.trim(),
});
//# sourceMappingURL=dom.js.map