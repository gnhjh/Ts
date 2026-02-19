import type { User } from "./service.js";

export const renderAllUsers = ({
  user,
  callback,
}: {
  user: User;
  callback: (id: number) => void;
}): HTMLTableRowElement => {
  const tr = document.createElement("tr");
  tr.dataset.id = user.id.toString(); // מזהה ייחודי לכל שורה

  // שם ואוואטר
  const nameTd = document.createElement("td");
  const avatar = document.createElement("div");
  avatar.className = "user-avatar";
  nameTd.appendChild(avatar);
  nameTd.append(user.name);

  // אימייל
  const emailTd = document.createElement("td");
  emailTd.textContent = user.email;

  // תג גישה
  const roleTd = document.createElement("td");
  const badge = document.createElement("span");
  badge.className = "access-badge";
  badge.textContent = "Founder";
  roleTd.appendChild(badge);

  // כפתור מחיקה
  const actionTd = document.createElement("td");
  actionTd.className = "action-cell";
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn-delete";
  deleteBtn.innerHTML = "✕";

  deleteBtn.onclick = () => {
    // אנימציה לפני הסרה
    tr.style.opacity = "0";
    tr.style.transform = "translateX(20px)";
    setTimeout(() => {
      callback(user.id); // קריאה ל-delete + הסרה מה-DOM
    }, 400);
  };

  actionTd.appendChild(deleteBtn);
  tr.append(nameTd, emailTd, roleTd, actionTd);

  return tr;
};

export function appendUsers(
  container: HTMLElement,
  usersList: User[],
  onDelete: (id: number) => void,
) {
  usersList.forEach((user) => {
    const userRow = renderAllUsers({
      user,
      callback: (id) => {
        // 1. עדכן את הנתונים
        onDelete(id);
        // 2. הסר את השורה מה-DOM
        const row = container.querySelector<HTMLTableRowElement>(
          `tr[data-id="${id}"]`,
        );
        if (row) row.remove();
      },
    });

    // שמור את ה-id בשורה עצמה כדי שנוכל למצוא אותה בקלות
    userRow.dataset.id = user.id.toString();

    container.appendChild(userRow);
  });
}
