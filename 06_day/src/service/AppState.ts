import type { AppStateShape } from "../types/types.js";

export class AppState {
  private state: AppStateShape;
  private listeners: Set<() => void> = new Set();

  constructor(initialState: AppStateShape) {
    this.state = initialState;
  }

  // ✅ קבל את כל ה-state
  getState(): AppStateShape {
    return { ...this.state }; // clone למניעת שינויים חיצוניים
  }

  // ✅ עדכן state חלקי
  setState(partial: Partial<AppStateShape>): void {
    this.state = { ...this.state, ...partial };
    this.notify(); // ← מודיע לכולם!
  }

  // ✅ הירשם לשינויים
  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);

    // ✅ מחזיר unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  // 🔒 פרטי - מודיע לכל ה-listeners
  private notify(): void {
    this.listeners.forEach((listener) => listener());
  }
}
