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
    static timestamp() {
        const date = new Date();
        const toLocalDate = date.toLocaleDateString("he-IL", {
            year: "2-digit",
            month: "2-digit",
            weekday: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
        return toLocalDate;
    }
}
//# sourceMappingURL=utils.js.map