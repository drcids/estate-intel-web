export interface User {
    name: string;
    email: string;
    address?:  string;
    id: number 
}

export interface TestUser {
    name: string;
    email: string;
    password: string;
    address?:  string;
    id: number 
}

export interface LoginDetails {
    email: string;
    password: string;
}