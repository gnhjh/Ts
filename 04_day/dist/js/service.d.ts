export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    createAt: string;
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
    getById(id: number): User | undefined;
    update(id: number, data: Partial<Pick<User, "name" | "email">>): {
        success: boolean;
        error?: string;
    };
    sortAZ(): User[];
    sortDate(): User[];
    sortSearch(value: string): User[];
}
//# sourceMappingURL=service.d.ts.map