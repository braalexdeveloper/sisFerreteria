import { DataTypes } from 'sequelize';


const SaleModel=(sequealize:any)=>{
    const Sale=sequealize.define(
        "Sale",
        {
              id: {
                  type: DataTypes.UUID,
                  defaultValue: DataTypes.UUIDV4,
                  primaryKey: true,
                },
               sale_date: {
                  type: DataTypes.DATE,
                  allowNull: false,
                },
                          
                tax: {
                  type: DataTypes.DECIMAL,
                  allowNull: false,
                },
                total: {
                  type: DataTypes.DECIMAL,
                  allowNull: false,
                },
                status:{
                    type:DataTypes.ENUM("VALID","CANCELED"),
                    allowNull: false,
                    defaultValue:'VALID'
                }
              },
              {
                timestamps: false,
              }
        
    );

    Sale.associate = (models:any) => {
      Sale.belongsToMany(models.Product,{through: models.SaleDetail});
      Sale.belongsTo(models.Client);
    }

    return Sale;
}

export default SaleModel;