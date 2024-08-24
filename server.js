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
        key: 'Up'
    },
    startup: {
        readyTimeout: 1.5
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

    const idClient = crypto.randomUUID();
    const treatment = SplitIOClient.getTreatment(idClient, 'Activacion');

    if (treatment === 'on') {
        keyUp = 'on';
    } else if (treatment === 'off') {
        keyUp = 'off';
    } else {
        keyUp = 'control'; // Tratamiento de control si no se obtiene 'on' o 'off'
    }

    return { "Up": keyUp, "idCliente": idClient };
});

// Ejecuta el servidor
try {
    await fastify.listen({ port: 3000 });
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
}
