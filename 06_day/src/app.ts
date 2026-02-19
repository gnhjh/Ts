import { UserList } from "./service/service.js";
import { sort } from "./utils/dom.js";
import {
  createUser,
  getFormValues,
  showErrors,
  validate,
  validateField,
  showFieldError,
} from "./utils/function.js";
import { UserTableController } from "./components/UserTable/UserTable.Controller.js";
import type { FormValues } from "./types/types.js";
import { AppState } from "./service/AppState.js";

const htmlForm = document.getElementById("regForm") as HTMLFormElement;
const usersList = document.getElementById("usersList") as HTMLTableElement;
const submitButton = htmlForm.querySelector(
  'button[type="submit"]',
) as HTMLButtonElement;

const users = new UserList();
let tableController: UserTableController;
let fieldErrors: Partial<Record<keyof FormValues, string | null>> = {};

// ✅ יצירת state מרכזי
const appState = new AppState({
  users: [],
  filter: "",
  sort: null,
  editingId: null,
});

init();

function init() {
  users.load();

  // ✅ עדכון state ראשוני
  appState.setState({ users: users.getAll() });

  // ✅ העברת state ל-controller
  tableController = new UserTableController(
    usersList,
    users,
    {
      sortAZ: sort.sortAZ,
      sortDate: sort.sortDate,
      search: sort.search,
    },
    appState, // ← העברה!
  );

  bindEvents();
}

function bindEvents() {
  htmlForm.addEventListener("submit", handleSubmit);

  const inputs = htmlForm.querySelectorAll<HTMLInputElement>(
    'input[type="text"], input[type="email"], input[type="password"]',
  );

  inputs.forEach((input) => {
    input.addEventListener("input", handleLiveValidation);
    input.addEventListener("blur", handleLiveValidation);
  });
}

function handleLiveValidation(e: Event) {
  const input = e.target as HTMLInputElement;
  const fieldName = input.name as keyof FormValues;
  if (!fieldName) return;

  const values = getFormValues();
  const error = validateField(fieldName, input.value.trim(), values, (email) =>
    users.isEmailExists(email),
  );

  fieldErrors[fieldName] = error;
  showFieldError(fieldName, error);
  updateSubmitButton();
}

function updateSubmitButton() {
  const hasErrors = Object.values(fieldErrors).some((error) => error !== null);
  const values = getFormValues();
  const allFieldsFilled =
    values.fullName && values.email && values.password && values.repeatPassword;

  submitButton.disabled = hasErrors || !allFieldsFilled;
}

function handleSubmit(e: Event) {
  e.preventDefault();

  const values = getFormValues();
  const errors = validate(values, (email) => users.isEmailExists(email));

  showErrors(errors);
  if (errors) return;

  const user = createUser(values);
  users.addUser(user);

  // ✅ עדכון state במקום refresh
  appState.setState({ users: users.getAll() });

  htmlForm.reset();
  fieldErrors = {};
  updateSubmitButton();
}
