export interface User {
    id: string; 
    login: string;
    password: string;
    version: number; 
    createdAt: number; 
    updatedAt: number; 
}

export type ReturnedUser = Omit<User, 'password'>;