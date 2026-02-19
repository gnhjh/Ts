import { UserList, User } from "./service.js";
import { Utils } from "./utils.js";
import { formError, formGroup, formInput, getFormValues } from "./dom.js";
import { getValidationError, showError } from "./function.js";
import { appendUsers, renderAllUsers } from "./rander.js";
const htmlForm = document.getElementById("regForm");
const usersList = document.getElementById("usersList");
const users = new UserList();
users.load();
appendUsers(usersList, users.getAllUsers(), (id) => users.delete(id));
htmlForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const values = getFormValues();
    const errors = getValidationError(values, users.isEmailExists(values.email));
    showError(errors);
    if (Object.keys(errors).length)
        return; // early exit אם יש שגיאות
    const newUser = {
        id: Date.now(),
        name: values.fullName,
        email: values.email,
        password: values.password, // NOTE: hash in production
    };
    users.addUser(newUser);
    htmlForm.reset();
    appendUsers(usersList, [newUser], (id) => users.delete(id));
    // הסרת מחלקות שגיאה
    Object.values(formGroup).forEach((c) => c.classList.remove("has-error"));
});
//# sourceMappingURL=app.js.map