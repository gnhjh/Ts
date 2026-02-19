export const renderUser = (user) => {
    const tr = document.createElement("tr");
    tr.setAttribute("data-id", user.id.toString());
    // שם, אימייל וגישה (כמו קודם)
    const nameTd = document.createElement("td");
    nameTd.innerHTML = `<div class="user-avatar"></div> <span class="user-name">${user.name}</span>`;
    const emailTd = document.createElement("td");
    emailTd.className = "user-email";
    emailTd.textContent = user.email;
    const roleTd = document.createElement("td");
    roleTd.innerHTML = `<span class="access-badge">Initiate</span>`;
    // --- תוספת: עמודת תאריך יצירה ---
    const dateTd = document.createElement("td");
    dateTd.className = "user-date";
    // פורמט תאריך נקי: DD/MM/YYYY
    dateTd.textContent = user.createAt;
    // עמודת פעולות
    const actionTd = document.createElement("td");
    actionTd.className = "action-cell";
    const editBtn = document.createElement("button");
    editBtn.dataset.action = "edit";
    editBtn.className = "btn-action btn-edit";
    editBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>`;
    const deleteBtn = document.createElement("button");
    deleteBtn.dataset.action = "delete";
    deleteBtn.className = "btn-action btn-delete";
    deleteBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
    deleteBtn.onclick = () => tr.classList.add("row-fade-out");
    actionTd.append(editBtn, deleteBtn);
    tr.append(nameTd, emailTd, roleTd, dateTd, actionTd); // הוספת ה-dateTd לפני ה-actionTd
    return tr;
};
export function renderUsers(container, userList) {
    container.innerHTML = "";
    const fragment = document.createDocumentFragment();
    userList.forEach((user) => {
        fragment.appendChild(renderUser(user));
    });
    container.appendChild(fragment);
}
//# sourceMappingURL=rander.js.map