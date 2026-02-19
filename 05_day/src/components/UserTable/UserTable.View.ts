import type { User } from "../../service/service";

type ViewEvents = {
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onSave?: (id: number, data: { name: string; email: string }) => void;
  onCancel?: (id: number) => void;
};

export class UserTableView {
  private editingId: number | null = null;

  constructor(
    private root: HTMLElement,
    private events: ViewEvents,
  ) {
    this.root.addEventListener("click", this.handleClick);
  }

  render(users: User[]) {
    this.root.replaceChildren(...users.map((user) => this.renderRow(user)));
  }

  private renderRow(user: User): HTMLTableRowElement {
    const tr = document.createElement("tr");
    tr.dataset.id = String(user.id);

    if (this.editingId === user.id) {
      // 🖊️ מצב עריכה (Inline Editing)
      tr.innerHTML = `
      <td>
        <div class="user-avatar"></div>
        <input type="text" class="edit-input" data-field="name" value="${user.name}" autofocus />
      </td>
      <td><input type="email" class="edit-input" data-field="email" value="${user.email}" /></td>
      <td><span class="access-badge">Initiate</span></td>
      <td class="user-date">${user.createAt}</td>
      <td class="action-cell">
        <button class="btn-action btn-save" data-action="save" title="Save Changes">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </button>
        <button class="btn-action btn-cancel" data-action="cancel" title="Discard">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </td>
    `;
    } else {
      // ✨ מצב תצוגה רגיל
      tr.innerHTML = `
      <td>
        <div class="user-avatar"></div>
        <span class="user-name">${user.name}</span>
      </td>
      <td class="user-email">${user.email}</td>
      <td><span class="access-badge">Initiate</span></td>
      <td class="user-date">${user.createAt}</td>
      <td class="action-cell">
        <button class="btn-action btn-edit" data-action="edit" title="Edit Identity">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
        </button>
        <button class="btn-action btn-delete" data-action="delete" title="Delete Identity">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </td>
    `;
    }

    return tr;
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
        this.enterEditMode(id);
        this.events.onEdit?.(id);
        break;
      case "delete":
        this.events.onDelete?.(id);
        break;
      case "save":
        this.handleSave(row, id);
        break;
      case "cancel":
        this.exitEditMode();
        this.events.onCancel?.(id);
        break;
    }
  };

  private enterEditMode(id: number) {
    this.editingId = id;
  }

  private exitEditMode() {
    this.editingId = null;
  }

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

    // בדיקות בסיסיות
    if (!data.name || !data.email) {
      alert("Please fill all fields");
      return;
    }

    this.exitEditMode();
    this.events.onSave?.(id, data);
  }
}
