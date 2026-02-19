import { Utils } from "./utils.js";

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  createAt: string;

  constructor(name: string, email: string, password: string) {
    this.id = Date.now();
    this.name = name;
    this.email = email;
    this.password = password;
    this.createAt = Utils.timestamp();
  }
}

export class UserList {
  public users: User[] = [];

  private save() {
    localStorage.setItem("user", JSON.stringify(this.users));
  }

  public load() {
    const local = localStorage.getItem("user");
    return local ? (this.users = JSON.parse(local)) : [];
  }

  getAllUsers() {
    return [...this.users];
  }

  addUser(user: User) {
    this.users.push(user);
    this.save();
  }

  isEmailExists(email: string) {
    const userEmail = email.toLowerCase();
    return this.users.some((u) => u.email.toLowerCase() === userEmail);
  }

  delete(id: number) {
    this.users = this.users.filter((u) => u.id !== id);
    this.save();
  }

  getById(id: number) {
    return this.users.find((u) => u.id === id);
  }

  update(
    id: number,
    data: Partial<Pick<User, "name" | "email">>,
  ): { success: boolean; error?: string } {
    const user = this.getById(id);
    if (!user) return { success: false, error: "User not found" };

    // בדיקת ייחודיות אימייל
    if (data.email && this.isEmailExists(data.email, id)) {
      return { success: false, error: "Email already exists" };
    }

    if (data.name !== undefined) user.name = data.name;
    if (data.email !== undefined) user.email = data.email;

    this.save();
    return { success: true };
  }

  sortAZ() {
    return this.getAllUsers().sort((a, b) => a.name.localeCompare(b.name));
  }
  sortDate() {
    return this.getAllUsers().sort((a, b) =>
      a.createAt.localeCompare(b.createAt),
    );
  }
  sortSearch(value: string) {
    const v = value.toLowerCase().trim();
    return this.getAllUsers().filter(
      (u) =>
        u.name.toLowerCase().includes(v) || u.email.toLowerCase().includes(v),
    );
  }
}
