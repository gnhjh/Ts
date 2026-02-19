import type { FormErrors, FormValues } from "./types.js";
export declare const getValidationError: (values: FormValues, isEmailExists: boolean) => Partial<Record<keyof FormValues, string>>;
export declare const showError: (errors: FormErrors) => void;
//# sourceMappingURL=function.d.ts.map