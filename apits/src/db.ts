import { Sequelize } from 'sequelize';
import config from './utils/config/index';
const { dbUser, dbPassword, dbHost, dbName, dbPort } =config;


import fs from 'fs';
import path from 'path';

// Instancia de Sequelize
const sequelize = new Sequelize({
    username: dbUser,
    password: dbPassword,
    database: dbName,
    host: dbHost,
    dialect: 'mysql',
    port: dbPort as number
});

// Cargar modelos automáticamente
const modelsDir = path.join(__dirname, 'models');
const models:any = {};

fs.readdirSync(modelsDir).forEach((file) => {
    const modelPath = path.join(modelsDir, file);
    const modelName = file.replace(/\.ts$/, ''); // Elimina la extensión ".ts" para obtener el nombre del modelo
    const model = require(modelPath).default; // Asegúrate de obtener la propiedad default
    models[modelName] = model(sequelize);
});



// Configurar relaciones
Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});


export {
    sequelize as conn,
    models,
};
