/* eslint-disable @typescript-eslint/no-var-requires */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import * as admin from 'firebase-admin';
import { ServiceAccount } from "firebase-admin";
import { AllExceptionsFilter } from './shared/exception.filter';
// const cluster = require('cluster');
// const numCPUs = require('os').cpus().length;
import compression from 'fastify-compress';
import { HttpStatus, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), { logger: true });
  app.setGlobalPrefix('v1')
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe({errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }));
  app.enableShutdownHooks();
  app.register(compression);
  app.register(require('fastify-multipart'))
  app.register(require('fastify-cors'), {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'WS', 'WSS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
  const options = new DocumentBuilder()
    .setTitle('TS Academy Endpoints')
    .setDescription('TS Academy EndPoints Docs')
    .addBearerAuth({ type: 'apiKey', name: 'Authorization' })
    .setBasePath('http://0.0.0.0:3093/v1')
    .setVersion('1.0')
    .build();


  // const adminConfig: ServiceAccount = {
  //   "projectId": "orid-9f95b",
  //   "privateKey": "-----BEGIN PRIVATE KEY-----\nMIIEugIBADANBgkqhkiG9w0BAQEFAASCBKQwggSgAgEAAoIBAQC8KnNs8UQOppTk\nP4DIgo6RgELBrsJDEh/CleT/Kjk9dQlYySfY+VVFTxoa5BoQfzz/zg4g4+zjbDfb\nCx1qtur9vA/b6TLkE2NVSV7+fwba1OJCBL/mO/hsYJqztUg2z9jXefGUtIucmibq\nGcgNWU7GjPMwDlph0paPhbTn8debR3+csTLgq0rJtkfrzjLT2WLUZB7K+dnfo0/S\nsYNYn6PvnFMuqb+gSdEPVyxRujnCSNn6ScZOzLhhcdpSoAXGPS2+ybmaDoPdW7Pq\nLrH52On20O/jeoxdvRF5oA2JMECESVsNMMP1/Sv/uWNRJVcHzj5JpQ9WTl5T/B2n\nogyBwtH3AgMBAAECggEAA2ccdZdlXNh2r9aq0bV0C5M6DH5IZWXHV5cAsFFHU2Jc\nRr6YhGF568odlZKTcBdE90v20HHJambIxHgj0ja4SC9loAX3FXh49Dq38jqXg/np\nP5AOF6/08vd072leAskTyaMbEyPdXyR12LJE/mIjkmP2eo4qj0NQ1WFHH2dYYqaf\n6r7QVCXcUzAKvPOgLmEI/VBnmlN71GeP/2kBoWVZlj1yzwVYNXbYwB3DdyVk6WOx\nELXFcyu2g8IJG+UM3ondXwKaUVu5DcHuto7Nt+qpO3KbYCEOGhLCvsioll+XbK1r\nTSYb0h2vmtrayGCyAC3NPEDHowq5tJ/aDgaS+pb4+QKBgQDddIzf4aQUS5wPyX1P\nFS799rij8z56+SUvJmMzusKLYx/9DOatmSpxqyLj322voZdPlPp5bGU2UgZarL4a\nzaIIogIzsBohk1YGrW+sBARSiqhsmJQjKCkCXfn3dOSt/hKCRsdq2qSngWZyP+It\nnSk51SIMp/AbDPSt1UXATyZiqQKBgQDZhIqfLoINej48Yiyk9XKfHIOATQn/jxtK\njDFJKFyvhASWiyN3X+yHikD5OpB/A6edPsnZAtd3OvhA6f9F9huBqS/tByRtfVNx\nuv8d2mNWawFGQbLqkU0tVr8ZNFVDn/0I0jQAdf5lfPb3bON2abcbsx0LbohwIW6c\nmM3FO3ETnwJ/J8rJhXEGCp+La0rJOWyVBQ1QICWVFIOwKsi7CpCEZIdrOA0ZZhgf\niE0397ot+2ENzz71wtu3VAtpGOHxRt+sPeDehGsgRugyjQCdEEuoeyxvFxRTif2t\nYL+CKvTWIm2E5ePR8WFYNMELp3vTKF8VCU9CzwNeIX4yeQnZfrS6MQKBgHCdKE+l\nenuT0GjewxJcaQ1ra8GfIRAIfS6pSlL/7IyKIv3151TEeubpcx4Vbf30XHESstoB\nmKAIDcM94oXMFw2YFFH5Iqj0+6CkGbTQ/iEdoTlIhmLe+z//60wXRhWO3SgV/ApJ\nDH5qpkoPO+xwavaSUvU6MrUq+eNlURNN5QstAoGACqb5CIOHbebe1FIMDsgNGNaW\nPSPihsn5xmWR2NMR4rxe8diakT0VEmQQ2UZdaYvlQOC5p8uhW0FpLOqQf3rVIfj3\n+7KMLK5kCAqeW9JbczlgIfcX0tHBdfS2Amgdb102YrnNAiH+zlBuIVOKOUZdhR89\nf6xDauT0C13kJllDDHA=\n-----END PRIVATE KEY-----\n".replace(/\\n/g, '\n'),
  //   "clientEmail": "firebase-adminsdk-31p5l@orid-9f95b.iam.gserviceaccount.com"
  // };

  // // Initialize the firebase admin app
  // admin.initializeApp({
  //   credential: admin.credential.cert(adminConfig),
  // });

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // if (cluster.isMaster) {
  //   console.log(`Master ${process.pid} is running`);

  //   // Fork workers.
  //   for (let i = 0; i < numCPUs; i++) {
  //     cluster.fork();
  //   }

  //   cluster.on('exit', (worker, code, signal) => {
  //     console.log(`worker ${worker.process.pid} died`);
  //   });
  // } else {
  //   // Workers can share any TCP connection
  //   // In this case it is an HTTP server


  //   console.log();
  // }
  await app.listen(3093, '0.0.0.0', () => {
    console.log('Server listening at http://0.0.0.0:' + 3093 + '/api/');
  })


}
bootstrap();
