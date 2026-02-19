📅 יום 6 — AppState + State-Driven Rendering

מטרה: ליצור ארכיטקטורה state-first, שבה כל שינוי ב‑UI מבוסס על state בלבד. הפרדת UI מה‑logic היא עיקרון מרכזי, המדמה React/Redux ומלמדת single source of truth ו‑unidirectional data flow.

1️⃣ יצירת AppState

צור מחלקה AppState שתשמש כמקור האחיד לנתונים (single source of truth).

דוגמה ל‑type:

type AppStateShape = {
  users: User[];
  filter: string;
  sort: "az" | "date" | null;
  editingId: number | null;
};


כל הנתונים המרכזיים של האפליקציה (users, filter, sort, editingId) נשמרים כאן.

AppState אחראי על כל מניפולציות על הנתונים בלבד — אין לו ידע על DOM.

2️⃣ Subscribe + setState + getState

הוסף למחלקה:

class AppState {
  private state: AppStateShape;
  private listeners: (() => void)[] = [];

  subscribe(listener: () => void) {
    this.listeners.push(listener);
  }

  setState(partial: Partial<AppStateShape>) {
    this.state = { ...this.state, ...partial };
    this.listeners.forEach(listener => listener());
  }

  getState() {
    return this.state;
  }
}


עקרונות:

setState ממזג את השינויים ומפעיל את כל ה‑listeners.

כל שינוי ב‑state גורם ל־render דרך subscribe — אין קריאה ישירה ל‑render ממקום אחר.

3️⃣ Controller & Actions

Controller לא יקרא יותר ל‑render:

// ❌ לא לעשות
this.render(...)

// ✅ במקום זה
this.state.setState({ users: this.store.getAll() });


כל פעולה (add, update, delete, sort, filter) משנה state בלבד.

ה‑View מקבלת state דרך ה‑subscribe ומצייר מחדש.

4️⃣ View

View לא שומרת editingId.

Render signature:

render(users: User[], editingId: number | null) {
  // מבנה הטבלה + DocumentFragment + כפתורי Edit/Delete
}


כל שינוי ב‑state → render נקי.

אין update ישיר ל‑DOM בלי לעדכן state.

5️⃣ בונוס למתקדמים

כל פעולות המשתמש (sort / search / edit / delete / save) עובדות דרך שינוי state בלבד.

Controller מנהל state, View רק מצייר.

🔹 מה תלמד מזה

Single Source of Truth

State-Driven Rendering

Unidirectional Data Flow

למה React עובד כמו שהוא עובד

למה Redux קיים

למה UI צריך להיות פונקציה של state

🔥 רמת קושי

גבוהה — דרוש דיסציפלינה ארכיטקטונית ושמירה על separation of concerns.

🏁 חוק אחד למשימה:
אסור לקרוא ל‑render ידנית יותר משום מקום בקוד. כל שינוי UI חייב לעבור דרך AppState ו‑subscribe.
