export type FormValues = {
  fullName: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export type FormErrors = Partial<Record<keyof FormValues, string>>;
