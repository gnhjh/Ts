import { User } from "../service/service";

export type FormValues = {
  fullName: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export type FormErrors = Partial<Record<keyof FormValues, string>>;

export type TableAction = "edit" | "save" | "cancel" | "delete";

// state/AppState.ts
export type AppStateShape = {
  users: User[];
  filter: string;
  sort: "az" | "date" | null;
  editingId: number | null;
};
