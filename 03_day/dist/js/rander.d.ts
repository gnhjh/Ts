import type { User } from "./service.js";
export declare const renderAllUsers: ({ user, callback, }: {
    user: User;
    callback: (id: number) => void;
}) => HTMLTableRowElement;
export declare function appendUsers(container: HTMLElement, usersList: User[], onDelete: (id: number) => void): void;
//# sourceMappingURL=rander.d.ts.map