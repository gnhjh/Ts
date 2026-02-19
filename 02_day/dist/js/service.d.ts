export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    constructor(name: string, email: string, password: string);
}
export declare class UserList {
    private users;
    getAllUsers(): User[];
    addUser(user: User): void;
}
//# sourceMappingURL=service.d.ts.map