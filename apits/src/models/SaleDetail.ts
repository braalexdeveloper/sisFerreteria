import { DataTypes } from 'sequelize';


const SaleDetailModel=(sequealize:any)=>{
    const SaleDetail=sequealize.define(
        "SaleDetail",
        {
              id: {
                  type: DataTypes.UUID,
                  defaultValue: DataTypes.UUIDV4,
                  primaryKey: true,
                },
               quantity: {
                  type: DataTypes.INTEGER,
                  allowNull: false,
                },
                          
                discount: {
                  type: DataTypes.DECIMAL,
                  allowNull: true,
                },
                subTotal: {
                  type: DataTypes.DECIMAL,
                  allowNull: false,
                }

                
              },
              {
                timestamps: false,
              }
        
    );

    return SaleDetail;
}

export default SaleDetailModel;