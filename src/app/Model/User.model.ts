import { EntityState } from "@ngrx/entity";

export interface Users{
    username: string,
    password: string,
    name: string,
    email: string,
    phone: string,
    role: string,
    gender: string,
    status: boolean
}

export interface UserModel extends EntityState<Users>{
    
}