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

export interface UserModel extends EntityState<Users>{}

export interface Usercred{
    username:string,
    password:string
}

export interface Userinfo{
    id:number,
    username:string,
    name:string,
    email:string,
    role:string,
    status:boolean
}