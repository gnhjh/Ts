import { UserList, User } from "./service.js";
import { Utils } from "./utils.js";
const htmlForm = document.getElementById("regForm");
const usersList = document.getElementById("usersList");
const formInput = {
    fullName: document.getElementById("fullName"),
    email: document.getElementById("email"),
    password: document.getElementById("password"),
    repeatPassword: document.getElementById("repeatPassword"),
};
const formError = {
    fullName: document.getElementById("fullNameError"),
    email: document.getElementById("emailError"),
    password: document.getElementById("passwordError"),
    repeatPassword: document.getElementById("repeatPasswordError"),
};
// Map inputs to their wrapping divs for has-error toggling
const formGroup = {
    fullName: formInput.fullName.closest(".input-group"),
    email: formInput.email.closest(".input-group"),
    password: formInput.password.closest(".input-group"),
    repeatPassword: formInput.repeatPassword.closest(".input-group"),
};
const users = new UserList();
// Collect trimmed values once for cleaner validation
const getFormValues = () => ({
    fullName: formInput.fullName.value.trim(),
    email: formInput.email.value.trim(),
    password: formInput.password.value.trim(),
    repeatPassword: formInput.repeatPassword.value.trim(),
});
// Validate inputs and return errors
const getValidationError = () => {
    const values = getFormValues();
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
    return errors;
};
// Show errors in UI and toggle has-error class
const showError = (errors) => {
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
const renderUser = (user) => {
    const { email, name } = user;
    return `       
    <tr>
     <td>
       <div class="user-avatar"></div>
       ${name}
     </td>
     <td>${email}</td>
     <td><span class="access-badge">Founder</span></td>
     </tr>
 `;
};
// Handle form submission
htmlForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const errors = getValidationError();
    showError(errors);
    if (Object.keys(errors).length === 0) {
        const values = getFormValues();
        const newUser = {
            id: Date.now(),
            name: values.fullName,
            email: values.email,
            password: values.password, // NOTE: hash in production
        };
        users.addUser(newUser);
        htmlForm.reset();
        usersList.innerHTML += renderUser(newUser);
        // Optionally, remove any remaining has-error classes
        Object.values(formGroup).forEach((container) => container.classList.remove("has-error"));
    }
});
//# sourceMappingURL=app.js.map