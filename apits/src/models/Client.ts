import { DataTypes } from 'sequelize';

const ClientModel=(sequealize:any)=>{
 const Client=sequealize.define(
 	"Client",
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
        lastName:{
            type:DataTypes.STRING,
            allowNull:false
        },
       dni:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
       ruc:{
            type:DataTypes.STRING,
            allowNull:true
        },
       email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
       phone:{
            type:DataTypes.STRING,
            allowNull:false
        },
       address:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },
    {
        timestamps:false
    }
 	);
 return Client;
}

export default ClientModel;