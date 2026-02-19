import { Utils } from "./utils.js";

export class User {
  private static nextId = 1;

  id: number;
  name: string;
  email: string;
  password: string;
  createAt: string;

  constructor(name: string, email: string, password: string) {
    this.id = User.nextId++;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createAt = Utils.timestamp();
  }
}

export class UserList {
  public users: User[] = [
    new User("Daniel Cohen", "daniel.cohen@example.com", "Password123"),
    new User("Maya Levi", "maya.levi@example.com", "SecurePass456"),
    new User("Noam BenDavid", "noam.bendavid@example.com", "NoamPass789"),
    new User("Tamar Friedman", "tamar.friedman@example.com", "TamarPass321"),
    new User("Omer Katz", "omer.katz@example.com", "OmerPass654"),
  ];

  private save() {
    localStorage.setItem("user", JSON.stringify(this.users));
  }

  public load() {
    const local = localStorage.getItem("user");
    return local ? (this.users = JSON.parse(local)) : [];
  }

  getAll() {
    return [...this.users];
  }

  addUser(user: User) {
    this.users.push(user);
    this.save();
  }
  isEmailExists(email: string, excludeUserId?: number) {
    const userEmail = email.toLowerCase();

    return this.users.some(
      (u) => u.email.toLowerCase() === userEmail && u.id !== excludeUserId,
    );
  }

  remove(id: number) {
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

    if (data.email !== undefined) {
      if (!Utils.validEmail(data.email)) {
        return { success: false, error: "Invalid email format" };
      }

      if (this.isEmailExists(data.email, id)) {
        return { success: false, error: "Email already exists" };
      }
    }

    if (data.name !== undefined) user.name = data.name;
    if (data.email !== undefined) user.email = data.email;

    this.save();
    return { success: true };
  }

  sortAZ() {
    return this.getAll().sort((a, b) => a.name.localeCompare(b.name));
  }

  sortDate() {
    return this.getAll().sort((a, b) => a.createAt.localeCompare(b.createAt));
  }

  sortSearch(value: string) {
    const v = value.toLowerCase().trim();
    return this.getAll().filter(
      (u) =>
        u.name.toLowerCase().includes(v) || u.email.toLowerCase().includes(v),
    );
  }
}
