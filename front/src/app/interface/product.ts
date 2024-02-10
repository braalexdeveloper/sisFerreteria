export interface Product{
    id?:any;
    name:string;
    description:string;
    price:number;
    stock:number;
    image?:string | File;
    category?:string;
}