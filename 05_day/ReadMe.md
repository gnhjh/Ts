# 📅 יום 5 — AppState + Live Validation + Clean Rendering

מטרה: לשפר את הטופס וטבלת המשתמשים כך שה‑UI וה‑logic יהיו מסודרים—עם חוויית משתמש טובה ורינדור מקצועי.

---

## 1️⃣ יצירת AppState

צור אובייקט או קלאס `AppState` שישמור את רשימת המשתמשים וידאג לכל מניפולציות על ה‑data. כל שינוי ב‑AppState יגרום ל‑re‑render של הטבלה.

דוגמה ל‑type:
```ts
type User = {
  id: string | number;
  name: string;
  email?: string;
  phone?: string;
  createdAt?: number;
};

type AppStateType = {
  users: User[];
  addUser: (user: User) => void;
  updateUser: (id: string | number, data: Partial<User>) => void;
  deleteUser: (id: string | number) => void;
  getUsers: () => User[]; // מחזיר העתק או מקור בהתאם לצורך
};
```

עקרונות:
- AppState הוא המקור האחיד לנתונים (single source of truth).
- כל פעולה שמשנה את ה‑state (`addUser`, `updateUser`, `deleteUser`) חייבת בקריאה ל־`renderAll()` או לפונקציה שמרנדרת את הטבלה מחדש.
- AppState לא צריך לדעת דבר על ה‑DOM. הוא רק משנה data.

---

## 2️⃣ Live Validation

- בצע בדיקות בזמן אמת (onInput) על כל שדה בטופס.
- כפתור `Submit` יהיה `disabled` כל עוד קיימת שגיאה.
- שמור את פונקציות ה‑validation ב־`utils.ts` או `functions.ts` (מקום נפרד מה‑UI).

דוגמה פשוטה:
```ts
// utils/validation.ts
export function validateName(name: string): string | null { /* מחזיר הודעת שגיאה או null */ }
export function validateEmail(email: string): string | null { /* ... */ }
export function validatePassword(pw: string): string | null { /* ... */ }
```

- ה‑form ו‑Renderer יקראו לפונקציות אלה בזמן הקלדה ויעדכנו את ה‑UI (הצגת שגיאה, מצב כפתור וכו').

---

## 3️⃣ Render עם DocumentFragment

- בניית הטבלה תתבצע באמצעות `DocumentFragment` ולא ב־`innerHTML +=` כדי לשפר ביצועים ולהימנע מהרצת reflow מיותר.
- כל שורה `<tr>` צריכה להכיל `data-id` ולכלול כפתורים: `Edit` / `Delete`.

דוגמה:
```ts
const fragment = document.createDocumentFragment();
appState.getUsers().forEach(user => {
  const row = Renderer.renderUserRow(user); // מחזיר HTMLElement (<tr>)
  fragment.appendChild(row);
});
tableBody.innerHTML = ''; // clear
tableBody.appendChild(fragment);
```

- על כל לחיצה על Edit/Delete יש לעדכן את ה‑AppState ואז לקרוא ל־`renderAllUsers()` — ולא לשנות שורה בודדת ב‑DOM ללא עדכון ה‑state.

---

## 4️⃣ ActionHandlers

שמירת כל ה‑handlers באובייקט מרוכז (Record) לניהול נקי של פעולות:

```ts
const actionHandlers = {
  onEdit: (id: string | number) => { /* set editingUserId, populate form from AppState */ },
  onSave: (id: string | number, data: Partial<User>) => { appState.updateUser(id, data); },
  onCancel: () => { /* clear editingUserId, reset form */ },
  onDelete: (id: string | number) => { appState.deleteUser(id); }
};
```

עקרונות חשובים:
- ActionHandlers קוראים ל‑AppState ו/או ל‑Renderer — לא לערבב לוגיקה של AppState עם DOM.
- ActionHandlers מסודרים ונקיים — כל פונקציה אחראית ל־task אחד.

---

## 5️⃣ Optional Challenge — Sort / Search בעזרת AppState

- הוסף אפשרות למיין (`sortByName`, `sortByDate`) ולסנן/לחפש (live search).
- כל פעולה תשנה state נגזר (או תעדכן flag/setting בתוך AppState) ותגרום ל־render מחדש — ללא שינוי מקור הנתונים.
- חיפוש/סינון צריכים להפיק תוצאה נגזרת (derived state) ולא לשנות את ה‑users המקוריים.

דוגמה לשיטות ב‑AppState:
```ts
function sortByName(): void { /* ממיין את ה‑users המוצגים ואז render */ }
function sortByDate(): void { /* ממיין לפי createdAt */ }
function setSearchQuery(q: string): void { /* מעדכן query, render עם derived list */ }
```

---

## 🔹 נקודות מיקוד (מה להתרכז בו)

- הפרדה ברורה בין לוגיקה (Service / AppState) ל‑UI (Renderer).
- שימוש נכון ב‑DocumentFragment לבניית הטבלה.
- Live validation + כפתור Submit מושבת כשהקלט לא תקין.
- ActionHandlers נקיים — לא מערבבים DOM בתוך לוגיקה עסקית.
- כל שינוי ב‑state → clear + re‑render נקי (אל תעשו patch ישיר על ה‑DOM במקום לעדכן state).

---

## דוגמת ארכיטקטורה קצרה

- AppState (קלאס/סינגלטון) — מחזיק users + CRUD + sort/search state.
- Renderer (מודול) — אחראי על בניית שורות, טבלה ויצירת ה‑DOM מתוך נתונים.
- Utils — פונקציות validation וניקוי נתונים.
- Controller / actionHandlers — מקשר בין UI ל‑AppState וה‑Renderer.

---

בהצלחה! אם תרצה — איצור עבורך תבנית קבצים (skeleton) ב‑TypeScript עם AppState, Renderer ו‑actionHandlers כדי להתחיל לעבוד. 🚀
