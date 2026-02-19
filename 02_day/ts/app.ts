import { UserList, User } from "./service.js";
import { Utils } from "./utils.js";

type FormErrors = Partial<{
  fullName: string;
  email: string;
  password: string;
  repeatPassword: string;
}>;

const htmlForm = document.getElementById("regForm") as HTMLFormElement;
const usersList = document.getElementById("usersList") as HTMLTableElement;

const formInput = {
  fullName: document.getElementById("fullName") as HTMLInputElement,
  email: document.getElementById("email") as HTMLInputElement,
  password: document.getElementById("password") as HTMLInputElement,
  repeatPassword: document.getElementById("repeatPassword") as HTMLInputElement,
};

const formError = {
  fullName: document.getElementById("fullNameError") as HTMLSpanElement,
  email: document.getElementById("emailError") as HTMLSpanElement,
  password: document.getElementById("passwordError") as HTMLSpanElement,
  repeatPassword: document.getElementById(
    "repeatPasswordError",
  ) as HTMLSpanElement,
};

// Map inputs to their wrapping divs for has-error toggling
const formGroup = {
  fullName: formInput.fullName.closest(".input-group") as HTMLDivElement,
  email: formInput.email.closest(".input-group") as HTMLDivElement,
  password: formInput.password.closest(".input-group") as HTMLDivElement,
  repeatPassword: formInput.repeatPassword.closest(
    ".input-group",
  ) as HTMLDivElement,
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
const getValidationError = (): FormErrors => {
  const values = getFormValues();
  const errors: FormErrors = {};

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
const showError = (errors: FormErrors) => {
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

const renderUser = (user: User) => {
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
htmlForm.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  const errors = getValidationError();
  showError(errors);

  if (Object.keys(errors).length === 0) {
    const values = getFormValues();

    const newUser: User = {
      id: Date.now(),
      name: values.fullName,
      email: values.email,
      password: values.password, // NOTE: hash in production
    };

    users.addUser(newUser);
    htmlForm.reset();
    usersList.innerHTML += renderUser(newUser);

    // Optionally, remove any remaining has-error classes
    Object.values(formGroup).forEach((container) =>
      container.classList.remove("has-error"),
    );
  }
});
