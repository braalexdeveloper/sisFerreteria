import { Auth } from "./auth";

export interface User extends Auth{
    name:string;
    image?:string;
    token?:string;
    RoleId?:string;
}