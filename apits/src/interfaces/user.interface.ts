import { Auth } from "./auth.interface";

export interface User extends Auth{
    name:string,
    image?:string,
    RoleId?:any
}