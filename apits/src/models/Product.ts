import { DataTypes } from "sequelize";

const ProductModel=(sequelize:any)=>{
    
const Product=sequelize.define(
    "Product",
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
        },
        price:{
            type:DataTypes.DECIMAL(10,2),
            allowNull:false
        },
        stock:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        image:{
            type:DataTypes.STRING,
            allowNull:true
        }
    },
    {
        timestamps:false
    }
 );

 Product.associate=(models:any)=>{
   Product.belongsTo(models.Category);
 }

 return Product;
}

export default ProductModel;