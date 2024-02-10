import { DataTypes } from 'sequelize';


const RoleModel=(sequealize:any)=>{
    const Role=sequealize.define(
        "Role",
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
             
              
              },
              {
                timestamps: false,
              }
        
    );
    Role.associate = (models:any) => {
        Role.hasMany(models.User);
        
    }
    return Role;
}

export default RoleModel;