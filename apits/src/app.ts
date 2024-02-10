import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

const app = express();

// Importación de rutas
import router_product from './routes/product';
import router_category from './routes/category';
import router_role from './routes/role';
import router_user from './routes/user';
import router_client from './routes/client';
import { router as router_auth } from './routes/auth';


// Configurar CORS
app.use(cors());
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Definir la ruta para servir archivos estáticos (imágenes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/auth',router_auth);
app.use('/products', router_product);
app.use('/categories', router_category);
app.use('/roles',router_role);
app.use('/users',router_user);
app.use('/clients',router_client);



// Se exporta el router en lugar de la app directamente
export default app;
