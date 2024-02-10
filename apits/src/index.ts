import app from './app';
import { conn } from './db';
import varEnv from './utils/config/index';

// Sincronizar modelos con la base de datos
conn.sync({ force: false })
  .then(async () => {
    // Lógica adicional después de la sincronización si es necesario
    console.log('Modelos sincronizados exitosamente.');

    // Iniciar el servidor
    app.listen(varEnv.port, () => {
      console.log('Servidor corriendo en el puerto: ' + varEnv.port);
    });
  })
  .catch((error: Error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });
