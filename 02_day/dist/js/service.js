export class User {
    id;
    name;
    email;
    password;
    constructor(name, email, password) {
        this.id = Date.now();
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
export class UserList {
    users = [];
    getAllUsers() {
        return [...this.users];
    }
    addUser(user) {
        this.users.push(user);
    }
}
//# sourceMappingURL=service.js.map