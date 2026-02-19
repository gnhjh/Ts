import { AppState } from "../../service/AppState.js";
import { User, UserList } from "../../service/service.js";
import { SortView } from "./comps/SortEvents.js";
import { UserTableView } from "./UserTable.View.js";

export class UserTableController {
  private store: UserList;
  private view: UserTableView;
  private sortView: SortView;
  private state: AppState;

  constructor(
    root: HTMLElement,
    store: UserList,
    sortElements: any,
    state: AppState, // ✅ מקבל את ה-state
  ) {
    this.store = store;
    this.state = state;

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

    // ✅ subscribe לשינויים ב-state
    this.state.subscribe(() => this.render());

    // ✅ רינדור ראשוני
    this.render();
  }

  // ✅ render לוקח את הכל מה-state
  private render() {
    const { users, filter, sort, editingId } = this.state.getState();

    let displayUsers = users;

    // ✅ סינון לפי חיפוש
    if (filter) {
      const f = filter.toLowerCase();
      displayUsers = displayUsers.filter(
        (u) =>
          u.name.toLowerCase().includes(f) || u.email.toLowerCase().includes(f),
      );
    }

    // ✅ מיון
    if (sort === "az") {
      displayUsers = [...displayUsers].sort((a, b) =>
        a.name.localeCompare(b.name),
      );
    } else if (sort === "date") {
      displayUsers = [...displayUsers].sort((a, b) =>
        a.createAt.localeCompare(b.createAt),
      );
    }

    // ✅ View מקבל גם editingId
    this.view.render(displayUsers, editingId);
  }

  // ✅ כל action משנה רק state
  private handleEdit = (id: number) => {
    this.state.setState({ editingId: id });
  };

  private handleDelete = (id: number) => {
    if (!confirm("Are you sure?")) return;

    this.store.remove(id);
    this.state.setState({
      users: this.store.getAll(),
      editingId: null,
    });
  };

  private handleSave = (id: number, data: { name: string; email: string }) => {
    const result = this.store.update(id, data);

    if (!result.success) {
      alert(result.error || "Failed to update");
    }

    this.state.setState({
      users: this.store.getAll(),
      editingId: null,
    });
  };

  private handleCancel = () => {
    this.state.setState({ editingId: null });
  };

  private handleSortAZ = () => {
    this.state.setState({ sort: "az" });
  };

  private handleSortDate = () => {
    this.state.setState({ sort: "date" });
  };

  private handleSearch = (term: string) => {
    this.state.setState({ filter: term });
  };

  // ✅ refresh מבחוץ
  public refresh() {
    this.state.setState({ users: this.store.getAll() });
  }
}
