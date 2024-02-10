import { Response,Request } from 'express';

import {models} from '../db';
const { Client } =models;
import { Client as ClientInterface } from '../interfaces/client.interface'

const clientController={
  allClients:async(req:Request,res:Response)=>{
    try{
    	const { textSearch }=req.query;
       let clients;
    	if(textSearch){
         clients=await Client.findAll({
       	 where:{
       	 	dni:textSearch
       	 }
       });
    	}else{
    		clients=await Client.findAll();
    	}

    	return res.status(200).json({
    		clients
    	});
       
    }catch(error){
      return res.status(500).json({
      	error
      })
    }
  },
  createClient:async(req:Request,res:Response)=>{
   try{
   	const { name,lastName,dni,address,email,phone,ruc }=req.body;
    	if(!name || !lastName || !dni || !address || !email || !phone){
          return res.status(400).json({
      	error:"Solo el campo ruc no es obligatorio!"
          })
    	}

    	let client:ClientInterface={
    		name,
    		lastName,
    		dni,
    		address,
    		email,
    		phone,
    		ruc
    	}

    	let newClient=await Client.create(client);

    	return res.status(201).json({
    		message:"Cliente creado correctamente!",
    		client:newClient
    	});
       
    }catch(error){
      return res.status(500).json({
      	error
      })
    }
  },
  updateClient:async(req:Request,res:Response)=>{
   try{
   	const { name,lastName,dni,address,email,phone,ruc }=req.body;
    	if(!name || !lastName || !dni || !address || !email || !phone){
          return res.status(400).json({
      	error:"Solo el campo ruc no es obligatorio!"
          })
    	}

    	let client:ClientInterface={
    		name,
    		lastName,
    		dni,
    		address,
    		email,
    		phone,
    		ruc
    	}

    	const [updatedRowCount]=await Client.update(client,{ where: { id: req.params.id } });

if(updatedRowCount>0){
  const updatedClient = await Client.findByPk(req.params.id);

        res.status(200).json({
          message: "Cliente actualizado correctamente",
          client: updatedClient,
        });
}else {
        res.status(404).json({
          message: "No se encontró el cliente para actualizar",
        });
      }
    
       
    }catch(error){
      return res.status(500).json({
      	error
      })
    }
  },
  deleteClient:async(req:Request,res:Response)=>{
    try {
      await Client.destroy({ where: { id: req.params.id } });
      res.status(200).json({
        message: "Cliente eliminado correctamente",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error interno al eliminar la categoría",
        error,
      });
    }
  }
}

export default clientController;