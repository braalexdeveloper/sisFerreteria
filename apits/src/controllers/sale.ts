import { Response,Request } from 'express';
import {models} from '../db';

const {Sale,SaleDetail}=models;

const saleController={
	allSales:async(req:Request,res:Response)=>{
      try{
        let sales=await Sale.findAll();


        return res.status(200).json({
        	message:"success",
        	sales
        });
      }catch(error:any){
        return res.status(500).json({
        	error:error.message
        });
      }
	},
	createSale:async(req:Request,res:Response)=>{
       try{

       	let { sale_date,tax,total,saleDetails }=req.body;

       	if(!sale_date || !tax || !total){
          return res.status(400).json({error:"Debe rellenar los campos obligatorios(sale_date,tax,total)!"});
       	}
        
        let sale=await Sale.create(req.body);
        
        for(let detail of saleDetails){
          let { quantity,discount,subTotal,ProductId }=detail;
           await SaleDetail.create({quantity,discount,subTotal,ProductId,SaleId:sale.id});
          }
        
        

        return res.status(200).json({
        	message:"Venta creada correctamente!",
        	sale
        });

      }catch(err:any){
        console.log(err)
        return res.status(500).json({
        	error:err
        });
      }

	}


}


export default saleController;