import { Utils } from "./utils.js";
export class User {
    id;
    name;
    email;
    password;
    createAt;
    constructor(name, email, password) {
        this.id = Date.now();
        this.name = name;
        this.email = email;
        this.password = password;
        this.createAt = Utils.timestamp();
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
    getById(id) {
        return this.users.find((u) => u.id === id);
    }
    update(id, data) {
        const user = this.getById(id);
        if (!user)
            return { success: false, error: "User not found" };
        // בדיקת ייחודיות אימייל
        if (data.email && this.isEmailExists(data.email, id)) {
            return { success: false, error: "Email already exists" };
        }
        if (data.name !== undefined)
            user.name = data.name;
        if (data.email !== undefined)
            user.email = data.email;
        this.save();
        return { success: true };
    }
    sortAZ() {
        return this.getAllUsers().sort((a, b) => a.name.localeCompare(b.name));
    }
    sortDate() {
        return this.getAllUsers().sort((a, b) => a.createAt.localeCompare(b.createAt));
    }
    sortSearch(value) {
        const v = value.toLowerCase().trim();
        return this.getAllUsers().filter((u) => u.name.toLowerCase().includes(v) || u.email.toLowerCase().includes(v));
    }
}
//# sourceMappingURL=service.js.map