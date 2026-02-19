export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    constructor(name: string, email: string, password: string);
}
export declare class UserList {
    users: User[];
    private save;
    load(): any;
    getAllUsers(): User[];
    addUser(user: User): void;
    isEmailExists(email: string): boolean;
    delete(id: number): void;
}
//# sourceMappingURL=service.d.ts.map