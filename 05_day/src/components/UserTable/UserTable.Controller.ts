import { User, UserList } from "../../service/service.js";
import { SortView } from "./comps/SortEvents.js";
import { UserTableView } from "./UserTable.View.js";

export class UserTableController {
  private store: UserList;
  private view: UserTableView;
  private sortView: SortView;

  constructor(root: HTMLElement, store: UserList, sortElements: any) {
    this.store = store;

    this.view = new UserTableView(root, {
      onEdit: this.handleEdit,
      onDelete: this.handleDelete,
      onSave: this.handleSave,
      onCancel: this.handleCancel,
    });

    this.sortView = new SortView(sortElements, {
      onSortAZ: this.handleSortAZ,
      onSortDate: this.handleSortDate,
      onSearch: this.handleSearch,
    });

    this.render(this.store.getAll());
  }

  public refresh() {
    this.render(this.store.getAll());
  }

  private render(users: User[]) {
    this.view.render(users);
  }

  private handleEdit = (id: number) => {
    // ✅ הוספתי רינדור מחדש כדי להראות את מצב העריכה
    this.render(this.store.getAll());
  };

  private handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    this.store.remove(id);
    this.render(this.store.getAll());
  };

  private handleSave = (id: number, data: { name: string; email: string }) => {
    const result = this.store.update(id, data);

    if (!result.success) {
      alert(result.error || "Failed to update user");
    }

    this.render(this.store.getAll());
  };

  private handleCancel = (id: number) => {
    this.render(this.store.getAll());
  };

  private handleSortAZ = () => {
    this.render(this.store.sortAZ());
  };

  private handleSortDate = () => {
    this.render(this.store.sortDate());
  };

  private handleSearch = (term: string) => {
    this.render(this.store.sortSearch(term));
  };
}
