export class Utils {
    static validName(name) {
        return name.length > 3;
    }
    static validEmail(email) {
        return email.length >= 3 && email.includes("@") && email.endsWith(".com");
    }
    static validPassword(password, repeatPassword) {
        return password.length >= 6 && password === repeatPassword;
    }
}
//# sourceMappingURL=utils.js.map