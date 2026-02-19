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

const htmlForm = document.getElementById("regForm") as HTMLFormElement;
const usersList = document.getElementById("usersList") as HTMLTableElement;
const submitButton = htmlForm.querySelector(
  'button[type="submit"]',
) as HTMLButtonElement;

const users = new UserList();
let tableController: UserTableController;

// Track validation state
let fieldErrors: Partial<Record<keyof FormValues, string | null>> = {};

init();

function init() {
  users.load();

  tableController = new UserTableController(usersList, users, {
    sortAZ: sort.sortAZ,
    sortDate: sort.sortDate,
    search: sort.search,
  });

  bindEvents();
}

function bindEvents() {
  htmlForm.addEventListener("submit", handleSubmit);

  // Live validation על כל input
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
  const error = validateField(fieldName, input.value.trim(), values);

  // שמירת המצב
  fieldErrors[fieldName] = error;

  // הצגת השגיאה
  showFieldError(fieldName, error);

  // עדכון מצב הכפתור
  updateSubmitButton();
}

function updateSubmitButton() {
  const hasErrors = Object.values(fieldErrors).some((error) => error !== null);
  const values = getFormValues();
  const allFieldsFilled =
    values.fullName && values.email && values.password && values.repeatPassword;

  // השבת כפתור אם יש שגיאות או שדות ריקים
  submitButton.disabled = hasErrors || !allFieldsFilled;
}

function handleSubmit(e: Event) {
  e.preventDefault();

  const values = getFormValues();
  const errors = validate(values);

  showErrors(errors);

  if (errors) return;

  const user = createUser(values);
  users.addUser(user);

  tableController.refresh();

  // איפוס
  htmlForm.reset();
  fieldErrors = {};
  updateSubmitButton();
}
