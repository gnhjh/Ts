import { UserList, User } from "./service.js";
import { sort, formGroup } from "./dom.js";
import { createUser, getFormValues, showErrors, validate } from "./function.js";
import { renderUser, renderUsers } from "./rander.js";
const htmlForm = document.getElementById("regForm");
const usersList = document.getElementById("usersList");
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
function handleSubmit(e) {
    e.preventDefault();
    const values = getFormValues();
    const errors = validate(values);
    showErrors(errors);
    if (errors)
        return;
    const user = createUser(values);
    users.addUser(user);
    usersList.appendChild(renderUser(user));
    htmlForm.reset();
}
sort.sortAZ.addEventListener("click", () => renderUsers(usersList, users.sortAZ()));
sort.sortDate.addEventListener("click", () => renderUsers(usersList, users.sortDate()));
sort.search.addEventListener("input", () => renderUsers(usersList, users.sortSearch(sort.search.value)));
function handleTableClick(e) {
    const target = e.target;
    const button = target.closest("button[data-action]");
    if (!button)
        return;
    const action = button.dataset.action;
    const row = button.closest("tr[data-id]");
    if (!row)
        return;
    const id = Number(row.dataset.id);
    actionHandlers[action]?.(row, id);
}
const actionHandlers = {
    edit: handleEdit,
    save: handleSave,
    cancel: handleCancel,
    delete: handleDelete,
};
function handleDelete(row, id) {
    row.classList.add("row-fade-out");
    setTimeout(() => {
        users.delete(id);
        row.remove();
    }, 400);
}
function handleEdit(row, id) {
    const user = users.getById(id);
    if (!user)
        return;
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
function handleSave(row, id) {
    const nameInput = row.querySelector(".edit-name");
    const emailInput = row.querySelector(".edit-email");
    if (!nameInput || !emailInput)
        return;
    const updatedName = nameInput.value.trim();
    const updatedEmail = emailInput.value.trim();
    users.update(id, {
        name: updatedName,
        email: updatedEmail,
    });
    const updatedUser = users.getById(id);
    if (!updatedUser)
        return;
    const newRow = renderUser(updatedUser);
    row.replaceWith(newRow);
}
function handleCancel(row, id) {
    const user = users.getById(id);
    if (!user)
        return;
    const newRow = renderUser(user);
    row.replaceWith(newRow);
}
//# sourceMappingURL=app.js.map