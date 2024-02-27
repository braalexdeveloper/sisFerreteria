import app from './app';
import { conn,models } from './db';
import varEnv from './utils/config/index';
import { hash } from "bcryptjs";

// Sincronizar modelos con la base de datos
conn.sync({ force: false })
  .then(async () => {
    // Lógica adicional después de la sincronización si es necesario
    console.log('Modelos sincronizados exitosamente.');
    
 

// Utilizar findOrCreate para buscar un usuario o crearlo si no existe
    const [admin, created] = await models.User.findOrCreate({
        where: { email: "brayan@gmail.com" },
        defaults: {
            name: "brayan",
            password: await hash("brayan123",8),
        }
    });

    if (created) {
        // Si el usuario fue creado, asignarle el rol de admin
        const rol = await models.Role.create({ name: "admin" });
        await admin.setRole(rol);
        console.log('Administrador creado exitosamente.');
    } else {
        console.log('El administrador ya existe. No se creará otro.');
    }
  
     

    // Iniciar el servidor
    app.listen(varEnv.port, () => {
      console.log('Servidor corriendo en el puerto: ' + varEnv.port);



    });
  })
  .catch((error: Error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });
