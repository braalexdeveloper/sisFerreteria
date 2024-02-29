"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const { Sale, SaleDetail, Client, Product } = db_1.models;
const saleController = {
    allSales: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let sales = yield Sale.findAll({ include: Client });
            let salesFormat = sales.map((item) => {
                return {
                    id: item.id,
                    sale_date: new Date(item.sale_date).toLocaleDateString('es-ES'),
                    status: item.status,
                    total: item.total,
                    ClientId: item.ClientId,
                    clientName: (item.Client.name + " " + item.Client.lastName)
                };
            });
            return res.status(200).json({
                message: "success",
                sales: salesFormat
            });
        }
        catch (error) {
            return res.status(500).json({
                error: error.message
            });
        }
    }),
    createSale: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let { sale_date, total, saleDetails } = req.body;
            if (!sale_date || !total || saleDetails.length < 1) {
                return res.status(400).json({ error: "Debe rellenar los campos obligatorios o escoger un producto!" });
            }
            let sale = yield Sale.create(req.body);
            for (let detail of saleDetails) {
                let { quantity, discount, subTotal, ProductId } = detail;
                yield SaleDetail.create({ quantity, discount, subTotal, ProductId, SaleId: sale.id });
            }
            // Obtener la venta con su cliente asociado
            const saleWithClient = yield db_1.models.Sale.findOne({
                where: { id: sale.id },
                include: {
                    model: db_1.models.Client,
                },
            });
            let formatSale = {
                id: saleWithClient.id,
                sale_date: new Date(saleWithClient.sale_date).toLocaleDateString('es-ES'),
                total: saleWithClient.total,
                status: saleWithClient.status,
                ClientId: saleWithClient.ClientId,
                clientName: (saleWithClient.Client.name + " " + saleWithClient.Client.lastName)
            };
            return res.status(200).json({
                message: "Venta creada correctamente!",
                sale: formatSale
            });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({
                error: err
            });
        }
    }),
    getSale: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const sale = yield Sale.findByPk(req.params.id, {
                include: [
                    {
                        model: Client // Incluye el modelo Client
                    },
                    {
                        model: Product
                    }
                ]
            });
            let formatSale = {
                id: sale.id,
                sale_date: new Date(sale.sale_date).toLocaleDateString('es-ES'),
                total: parseFloat(sale.total).toFixed(2),
                client: sale.Client.name + " " + sale.Client.lastName,
                dni: sale.Client.dni,
                ruc: sale.Client.ruc,
                email: sale.Client.email,
                phone: sale.Client.phone,
                address: sale.Client.address,
                products: sale.Products.map((el) => {
                    return {
                        id: el.id,
                        name: el.name,
                        description: el.description,
                        price: parseFloat(el.price).toFixed(2),
                        image: el.image,
                        quantity: el.SaleDetail.quantity,
                        subtotal: parseFloat(el.SaleDetail.subTotal).toFixed(2)
                    };
                })
            };
            return res.status(200).json({
                sale: formatSale
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                error
            });
        }
    })
};
exports.default = saleController;
