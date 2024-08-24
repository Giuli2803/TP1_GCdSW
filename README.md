# TP1_GCdSW

Consigna:

Definir 4 feature flags:

- 1 feature flag va a ser asignada a una sola persona (mediante un individual target) (Color azul)
- 1 feature flag va a ser asignada a un segmento que contenga 2 personas (mediante un individual targets) creando y seleccionado un evento. (Color naranja)
- Los 2 feature flags van a ser para e resto de los usuarios con una probabilidad 50/50 (Color Verde y violeta).

Una vez definidas se debe desplegar el programa en diferentes clientes y mediante los IDs particulares se debe observar el comportamiento descripto en la herramienta de feature flag (split en este caso).


Dependecias a descargar para correr el proyecto:

En la carpeta del proyecto principal correr: 

- npm install --save @splitsoftware/splitio
- npm i fastify
- npm install dotenv

(Si no tienes npm puedes usar el comando sudo apt install npm)

Se debe crear el archivo .env con la variable "SPLIT_IO_AUTHORIZATION_KEY = xxxxxxxxxxxx" en donde se reemplaza las x por el SDK API Key de la cuenta de sprit a la cual se le quiere consultar la featureflag. (Usualmente vamos a usar el de Enviroment staging y de nombre server side).

Para correr el proyecto se debe utilizar el siguiente comando :

- npm start 

Este comando levanta la configuración del package.json e iniciar a correr nuestro servidor de prueba.


