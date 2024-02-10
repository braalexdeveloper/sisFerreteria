import { DataTypes } from 'sequelize';


const UserModel=(sequealize:any)=>{
    const User=sequealize.define(
        "User",
        {
              id: {
                  type: DataTypes.UUID,
                  defaultValue: DataTypes.UUIDV4,
                  primaryKey: true,
                },
               name: {
                  type: DataTypes.STRING,
                  allowNull: false,
                },
             
               
                email: {
                  type: DataTypes.STRING,
                  allowNull: false,
                },
               
                password: {
                  type: DataTypes.STRING,
                  allowNull: false,
                },
                image: {
                  type: DataTypes.STRING,
                  allowNull:true,
                  defaultValue: "foto-perfil-default.png"
                },
                token:{
                  type:DataTypes.STRING,
                  defaultValue: null
                }
              },
              {
                timestamps: false,
              }
        
    );

    User.associate = (models:any) => {
        User.belongsTo(models.Role);
        
    }

    return User;
}

export default UserModel;