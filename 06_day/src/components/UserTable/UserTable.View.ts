import { User } from "../../service/service.js";

// הסר את editingId מה-View
export class UserTableView {
  constructor(
    private root: HTMLElement,
    private events: any,
  ) {
    this.root.addEventListener("click", this.handleClick);
  }

  // ✅ עכשיו מקבל editingId מבחוץ
  render(users: User[], editingId: number | null) {
    this.root.replaceChildren(
      ...users.map((user) => this.renderRow(user, editingId)),
    );
  }

  private renderRow(user: User, editingId: number | null): HTMLTableRowElement {
    const tr = document.createElement("tr");
    tr.dataset.id = String(user.id);

    if (editingId === user.id) {
      // 🖊️ Edit mode
      tr.innerHTML = `
        <td>
          <div class="user-info">
            <div class="avatar">${this.getInitials(user.name)}</div>
            <input type="text" class="edit-input" data-field="name" value="${user.name}" autofocus />
          </div>
        </td>
        <td><input type="email" class="edit-input" data-field="email" value="${user.email}" /></td>
        <td><span class="badge">Initiate</span></td>
        <td><span class="user-date">${user.createAt}</span></td>
        <td class="actions-cell">
          <div class="actions-inner">
            <button class="btn-icon btn-save" data-action="save" title="Save Changes">
              <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </button>
            <button class="btn-icon btn-cancel" data-action="cancel" title="Discard">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </td>
      `;
    } else {
      // ✨ View mode
      tr.innerHTML = `
        <td>
          <div class="user-info">
            <div>
              <div class="user-name">${user.name}</div>
              <div class="user-email">${user.email}</div>
            </div>
            <div class="avatar">${this.getInitials(user.name)}</div>
          </div>
        </td>
        <td>${user.email}</td>
        <td><span class="badge">Initiate</span></td>
        <td><span class="user-date">${user.createAt}</span></td>
        <td class="actions-cell">
          <div class="actions-inner">
            <button class="btn-icon btn-edit" data-action="edit" title="Edit Identity">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
            </button>
            <button class="btn-icon btn-delete" data-action="delete" title="Delete Identity">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M9 6V4h6v2"></path></svg>
            </button>
          </div>
        </td>
      `;
    }
    return tr;
  }

  private getInitials(name: string): string {
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  private handleClick = (e: Event) => {
    const button = (e.target as HTMLElement).closest<HTMLButtonElement>(
      "button[data-action]",
    );
    if (!button) return;

    const row = button.closest<HTMLTableRowElement>("tr[data-id]");
    if (!row) return;

    const id = Number(row.dataset.id);
    const action = button.dataset.action;

    switch (action) {
      case "edit":
        this.events.onEdit?.(id);
        break;
      case "delete":
        this.events.onDelete?.(id);
        break;
      case "save":
        this.handleSave(row, id);
        break;
      case "cancel":
        this.events.onCancel?.(id);
        break;
    }
  };

  private handleSave(row: HTMLTableRowElement, id: number) {
    const nameInput = row.querySelector<HTMLInputElement>(
      'input[data-field="name"]',
    );
    const emailInput = row.querySelector<HTMLInputElement>(
      'input[data-field="email"]',
    );

    if (!nameInput || !emailInput) return;

    const data = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
    };

    if (!data.name || !data.email) {
      alert("Please fill all fields");
      return;
    }

    this.events.onSave?.(id, data);
  }
}
