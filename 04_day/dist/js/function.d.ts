import { User } from "./service.js";
import type { FormErrors, FormValues } from "./types.js";
export declare const getFormValues: () => {
    fullName: string;
    email: string;
    password: string;
    repeatPassword: string;
};
export declare const validate: (values: FormValues) => Partial<Record<keyof FormValues, string>> | null;
export declare const showErrors: (errors: FormErrors | null) => void;
export declare const createUser: (values: FormValues) => User;
//# sourceMappingURL=function.d.ts.map