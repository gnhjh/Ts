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
  private users: User[] = [];

  getAllUsers() {
    return [...this.users];
  }

  addUser(user: User) {
    this.users.push(user);
  }
}
