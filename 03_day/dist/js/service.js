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
    save() {
        localStorage.setItem("user", JSON.stringify(this.users));
    }
    load() {
        const local = localStorage.getItem("user");
        return local ? (this.users = JSON.parse(local)) : [];
    }
    getAllUsers() {
        return [...this.users];
    }
    addUser(user) {
        this.users.push(user);
        this.save();
    }
    isEmailExists(email) {
        const userEmail = email.toLowerCase();
        return this.users.some((u) => u.email.toLowerCase() === userEmail);
    }
    delete(id) {
        this.users = this.users.filter((u) => u.id !== id);
        this.save();
    }
}
//# sourceMappingURL=service.js.map