import { DataTypes } from "sequelize";

const CategoryModel=(sequelize:any)=>{
    
const Category=sequelize.define(
    "Category",
    {
        id:{
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        description:{
            type:DataTypes.TEXT,
            allowNull:true
        }
    },
    {
        timestamps:false
    }
 );

 Category.associate=(models:any)=>{
   Category.hasMany(models.Product);
 }

 return Category;
}

export default CategoryModel;