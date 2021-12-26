"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const path_1 = require("path");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const admin = require("firebase-admin");
const exception_filter_1 = require("./shared/exception.filter");
const fastify_compress_1 = require("fastify-compress");
const common_1 = require("@nestjs/common");
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    app.setGlobalPrefix('v1');
    app.useWebSocketAdapter(new platform_socket_io_1.IoAdapter(app));
    app.useGlobalFilters(new exception_filter_1.AllExceptionsFilter());
    app.useGlobalPipes(new common_1.ValidationPipe({
        errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
    }));
    app.enableShutdownHooks();
    app.register(fastify_compress_1.default);
    app.register(require('fastify-multipart'));
    app.register(require('fastify-cors'), {
        origin: '*',
        methods: ['GET', 'PUT', 'POST', 'DELETE', 'WS', 'WSS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    const options = new swagger_1.DocumentBuilder()
        .setTitle('TS Academy Endpoints')
        .setDescription('TS Academy EndPoints Docs')
        .addServer('http://0.0.0.0:3093', 'Local Server', {
        clientToken: {
            default: 'GPArE2mR+4yu37oxT/HMBvifTgDViU7164H93TtInNY',
            description: 'Client Token',
        },
    })
        .addServer('http://169.51.198.68:3093', 'Test  Server', {
        clientToken: {
            default: 'GPArE2mR+4yu37oxT/HMBvifTgDViU7164H93TtInNY',
            description: 'Client Token',
        },
    })
        .addBearerAuth({ type: 'apiKey', name: 'Authorization' })
        .setVersion('1.0')
        .build();
    app.useStaticAssets({
        root: (0, path_1.join)(__dirname, '..', 'public'),
        prefix: '/public/',
    });
    app.setViewEngine({
        engine: {
            handlebars: require('handlebars'),
        },
        templates: (0, path_1.join)(__dirname, '..', 'src', 'views'),
    });
    const adminConfig = {
        projectId: 'academy',
        privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQDbQgMHhWCVL3yD\n63xW0wYeXgTjcLsu5/sRYIKXRCN4xYA3guBo4WNJJlgluGw2SwfDtlG367iW2Gaf\nXotp37h/hrvqMDP6B2VBx/5Fr5r+yl2CcjOogBqSPALFIaPp2YthE7P54yPKD+M/\nikY1ix/G6pIcoN3InEZ3X/2517XLVPGSip5L5h6r0FG32Hrn8paaesrYO++n/BYM\nrd5K48RmtJMBOo0yD5zfKc+DUKYpiPeaE1cKuH19EU3qNeNRp0qLe8h9tspCDJM+\nUJ4MSDhLtXwlCX/aVErH5c30RaTslELQbiFh1vlAYE74LCydr3hh0uTlB3A1EjqO\n0bg5PJBNAgMBAAECggEAAVFgAclQ3OIHGlGNyDAmsFjfKCZ7EDYyPuGTigkNj9yw\ntNoLSG4Zt0Hs/osMJsu5fU5o/CqaoS4l+G1sd+4xkR3+8/0mrtPLuBhq5EHWNBOv\negjUMSjV9WI5dQm1pG1GO8bkdSB4TFm0mLhCIZvCDONyOIxUpkT0Mnmn+tg7qOrJ\nWwrvyHxRPUq5ES7VAVRJ3ZOGXG2fY13jZVz5jQ6DK5/En+iJResv6rWQUsNEmfGU\nHuZdISxtsB3CcXr3pWG8CXrJxCu5szsjFv22a/gMobxLlhMuBwQEv6iw+LIDj0Id\npeFXcgTkoYKG24hykhWyeAhJhRsyZRHgTbrMAVgKgQKBgQD1WPlks1gAjHa73HyI\n7OmhIrowC6hf9eIFKjkuH1iR2FAp3mO0hNoY+tqIThrnGUctkrwllAJ9xpdxhJFf\nOrCCEkvQVbqWSgs3bhJ6ROs20PaSLeOhbPSz1xHwfMpijfGbHqxYkUCd9Eeximjj\njHxXumARut6L8AY+kuPGgz7MzQKBgQDkxw1NrzxbW287QmCI3YuRM+kno0PoTa15\nFOfhtAhCxM5J07g881BgKVF6OmdjZpMXUx3Eh5/UkyVIgDzU4bJvhEt71qWU4kkt\nzhi4RHwUoN2TBQBvHa26kaieA6Yz11h3f0oaP8Sr8iWy4+XFLImU1Yg8rXUyu3l2\nsGxpFvTRgQJ/GOrwaUnNpkCdznaWL1HgaH0ea8LDVvuh+ORQ6l5EoItXmOj9N1hG\nzkKr7yv/j3kBwZ8lfKuLlTqWJvFP0lwjkRJKoN4UFS9v9DE5rzFQskCGylHezIZE\nU/+D0ujZpSjFYPu8hUI7Tc+BeIaWIIYkGsTS/Pn9oDjAaZqBh6fMuQKBgQCjduK3\nji03LabVlcD6KipuLsQ6cTq1QsNfj6N7rrJ0WsD3GVM8IbJdc0hnaFG1QXZ6JQZR\nBYMbVaQ/IHnWtglUCxgQPTeEoQcetnMNPsnVx3dqdBlyS6d1dlwfw4W+5vCsOYRO\nKyAwp81t+86SSxdnBAfbKylhfXj1aGudzyxQgQKBgCv/sWzEEVBRRsZErHgA0eaZ\noLcNLhl3p01oK+gtqH5j6bPrBlZDyaB0xJv5NW8QBbFWoWdSAJ730LLDry3X6MHA\nBHlJEh0izmNJ9jLBX/SsNIxkYex9AFbgyceEaveZ6fmpLeYMR7sC1McIfdbWaVnJ\nWa/rgh739Sy+3n3r06SS\n-----END PRIVATE KEY-----\n'.replace(/\\n/g, '\n'),
        clientEmail: 'firebase-adminsdk-l29uz@ts-academy.iam.gserviceaccount.com',
    };
    admin.initializeApp({
        credential: admin.credential.cert(adminConfig),
    });
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3093, '0.0.0.0', () => {
        console.log('Server listening at http://0.0.0.0:' + 3093 + '/api/');
    });
}
bootstrap();
//# sourceMappingURL=main.js.map