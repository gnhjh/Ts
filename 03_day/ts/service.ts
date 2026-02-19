export class User {
  id: number;
  name: string;
  email: string;
  password: string;

  constructor(name: string, email: string, password: string) {
    this.id = Date.now();
    this.name = name;
    this.email = email;
    this.password = password;
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
}
