import { Auth } from "./auth";

export interface User extends Auth{
    id?:string,
    name:string;
    image?:any|File;
    token?:string;
    RoleId?:string;
    Role?:any
}