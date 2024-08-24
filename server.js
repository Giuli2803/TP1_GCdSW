import Fastify from 'fastify';
import crypto from 'crypto';  // Asegúrate de importar el módulo crypto
import { SplitFactory } from '@splitsoftware/splitio';
import dotenv from 'dotenv';

// Carga las variables de entorno
dotenv.config();

const fastify = Fastify({
    logger: true
});

// Instancia el SDK
const factory = SplitFactory({
    core: {
        authorizationKey: process.env.SPLIT_IO_AUTHORIZATION_KEY,
    },
    startup: {
        readyTimeout: 1.5
    },
    scheduler: {
        featuresRefreshRate: 0 // Desactiva el cacheado, refresca en cada solicitud
    }
});

// Obtén la instancia del cliente que usarás
const SplitIOClient = factory.client();

let sdkReady = false;
let keyUp = 'undefined';

// Asegúrate de que el SDK esté listo
SplitIOClient.on(SplitIOClient.Event.SDK_READY, () => {
    console.log('Split SDK is ready!');
    sdkReady = true;
});

// Declara una ruta
fastify.get('/', async function handler(request, reply) {
    if (!sdkReady) {
        // Si el SDK no está listo, devuelve un error
        return reply.status(503).send({ error: 'SDK not ready yet' });
    }

    const idClient = '28202115765415654aaa'; // Este ID podría ser dinámico
    // Aquí es donde llamas al tratamiento usando `idClient`.
    const treatment = SplitIOClient.getTreatment(idClient, 'TP1');

    // Maneja el tratamiento recibido
    if (treatment === 'Azul') {
        keyUp = 'azul';
    } else if (treatment === 'Naranja') {
        keyUp = 'naraja';
    } else if (treatment === 'Verde') {
        keyUp = 'verde';
    } else if (treatment === 'Violeta') {
        keyUp = 'Violeta';
    }
    else {
        keyUp = 'control'; // Tratamiento de control si no se obtiene 'on', 'off' o 'Azul'
    }

    // Respuesta con los datos del cliente y el tratamiento
    return { "Up": keyUp, "idCliente": idClient };
});

// Ejecuta el servidor
try {
    await fastify.listen({ port: 3000 });
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
}
