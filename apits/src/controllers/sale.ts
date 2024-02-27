import { Response,Request } from 'express';
import {models} from '../db';

const {Sale,SaleDetail,Client,Product}=models;

const saleController={
	allSales:async(req:Request,res:Response)=>{
      try{
        let sales=await Sale.findAll({include:Client});

        let salesFormat=sales.map((item:any)=>{
           return {
            id:item.id,
            sale_date:new Date(item.sale_date).toLocaleDateString('es-ES'),
            status:item.status,
            total:item.total,
            ClientId:item.ClientId,
            clientName:(item.Client.name+" "+item.Client.lastName)
           }
        });

        return res.status(200).json({
        	message:"success",
        	sales:salesFormat
        });
      }catch(error:any){
        return res.status(500).json({
        	error:error.message
        });
      }
	},
	createSale:async(req:Request,res:Response)=>{
       try{

       	let { sale_date,total,saleDetails }=req.body;

       	if(!sale_date || !total || saleDetails.length<1){
          return res.status(400).json({error:"Debe rellenar los campos obligatorios o escoger un producto!"});
       	}
        
        let sale=await Sale.create(req.body);
        
        for(let detail of saleDetails){
          let { quantity,discount,subTotal,ProductId }=detail;
           await SaleDetail.create({quantity,discount,subTotal,ProductId,SaleId:sale.id});
          }
        

        // Obtener la venta con su cliente asociado
const saleWithClient = await models.Sale.findOne({
  where: { id: sale.id },
  include: {
    model: models.Client,
    
  },
});

let formatSale={
  id:saleWithClient.id,
  sale_date:new Date(saleWithClient.sale_date).toLocaleDateString('es-ES'),
  total:saleWithClient.total,
  status:saleWithClient.status,
  ClientId:saleWithClient.ClientId,
  clientName:(saleWithClient.Client.name+" "+saleWithClient.Client.lastName)
}
        

        return res.status(200).json({
        	message:"Venta creada correctamente!",
        	sale:formatSale
        });

      }catch(err:any){
        console.log(err)
        return res.status(500).json({
        	error:err
        });
      }

	},
  getSale:async(req:Request,res:Response)=>{
   
   try{
      const sale=await Sale.findByPk(req.params.id,{
  include: [
  {
    model: Client // Incluye el modelo Client
  },
  {
    model:Product
  }
  ]
});

      let formatSale={
        id:sale.id,
        sale_date:new Date(sale.sale_date).toLocaleDateString('es-ES'),
        total:parseFloat(sale.total).toFixed(2),
        client:sale.Client.name+" "+sale.Client.lastName,
        dni:sale.Client.dni,
        ruc:sale.Client.ruc,
        email:sale.Client.email,
        phone:sale.Client.phone,
        address:sale.Client.address,
        products:sale.Products.map((el:any)=>{
         return{
          id:el.id,
          name:el.name,
          description:el.description,
          price:parseFloat(el.price).toFixed(2),
          image:el.image,
          quantity:el.SaleDetail.quantity,
          subtotal:parseFloat(el.SaleDetail.subTotal).toFixed(2)
          }

        })
      }

      return res.status(200).json({
        sale:formatSale
      });
   }catch(error){
console.log(error)
        return res.status(500).json({
          error
        });
   }
  }


}


export default saleController;