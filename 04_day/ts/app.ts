import { UserList, User } from "./service.js";
import { sort, formGroup } from "./dom.js";
import { createUser, getFormValues, showErrors, validate } from "./function.js";
import { renderUser, renderUsers } from "./rander.js";
import type { TableAction } from "./types.js";

const htmlForm = document.getElementById("regForm") as HTMLFormElement;
const usersList = document.getElementById("usersList") as HTMLTableElement;

const users = new UserList();

init();

function init() {
  users.load();
  renderUsers(usersList, users.getAllUsers());
  bindEvenet();
}

function bindEvenet() {
  htmlForm.addEventListener("submit", handleSubmit);
  usersList.addEventListener("click", handleTableClick);
}

function handleSubmit(e: Event) {
  e.preventDefault();

  const values = getFormValues();
  const errors = validate(values);

  showErrors(errors);

  if (errors) return;

  const user = createUser(values);
  users.addUser(user);
  usersList.appendChild(renderUser(user));

  htmlForm.reset();
}

sort.sortAZ.addEventListener("click", () =>
  renderUsers(usersList, users.sortAZ()),
);
sort.sortDate.addEventListener("click", () =>
  renderUsers(usersList, users.sortDate()),
);
sort.search.addEventListener("input", () =>
  renderUsers(usersList, users.sortSearch(sort.search.value)),
);

function handleTableClick(e: Event) {
  const target = e.target as HTMLElement;
  const button = target.closest<HTMLButtonElement>("button[data-action]");
  if (!button) return;

  const action = button.dataset.action as TableAction;
  const row = button.closest<HTMLTableRowElement>("tr[data-id]");
  if (!row) return;

  const id = Number(row.dataset.id);

  actionHandlers[action]?.(row, id);
}

const actionHandlers: Record<
  TableAction,
  (row: HTMLTableRowElement, id: number) => void
> = {
  edit: handleEdit,
  save: handleSave,
  cancel: handleCancel,
  delete: handleDelete,
};

function handleDelete(row: HTMLTableRowElement, id: number) {
  row.classList.add("row-fade-out");

  setTimeout(() => {
    users.delete(id);
    row.remove();
  }, 400);
}

function handleEdit(row: HTMLTableRowElement, id: number) {
  const user = users.getById(id);
  if (!user) return;

  row.innerHTML = `
    <td>
      <input class="edit-name" value="${user.name}" />
    </td>
    <td>
      <input class="edit-email" value="${user.email}" />
    </td>
    <td><span class="access-badge">Initiate</span></td>
    <td>${user.createAt}</td>
    <td class="action-cell">
      <button data-action="save" class="btn-action">Save</button>
      <button data-action="cancel" class="btn-action">Cancel</button>
    </td>
  `;
}

function handleSave(row: HTMLTableRowElement, id: number) {
  const nameInput = row.querySelector<HTMLInputElement>(".edit-name");
  const emailInput = row.querySelector<HTMLInputElement>(".edit-email");

  if (!nameInput || !emailInput) return;

  const updatedName = nameInput.value.trim();
  const updatedEmail = emailInput.value.trim();

  users.update(id, {
    name: updatedName,
    email: updatedEmail,
  });

  const updatedUser = users.getById(id);
  if (!updatedUser) return;

  const newRow = renderUser(updatedUser);
  row.replaceWith(newRow);
}

function handleCancel(row: HTMLTableRowElement, id: number) {
  const user = users.getById(id);
  if (!user) return;

  const newRow = renderUser(user);
  row.replaceWith(newRow);
}
