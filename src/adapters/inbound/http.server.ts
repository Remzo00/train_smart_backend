import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import PinoHttp from 'pino-http';
import { UserHttpHandler } from './user_http_handler';
import { UserServiceImpl } from '../../core/application/user_service_impl';
import { UserRepositoryImpl } from '../outbound/user_repository_impl';
import { JwtRepositoryImpl } from '../outbound/jwt_repository_impl';
import { AuthServiceImpl } from '../../core/application/auth_service_impl';
import { AuthHttHandler } from './auth_http_handler';
import { MiddlewareFactory } from '../../infrastructure/middlewares/middlewareFactory';
import 'dotenv/config';

const port = process.env.PORT || 5000;
const swaggerServer: any[] = [];

// Swagger definition
const swaggerDefinition = {
  info: {
    title: 'Express API with Swagger',
    version: '1.0.0',
    description: 'train smart application',
  },
  servers: swaggerServer,
  components:{
    securitySchemes:{
      BearerAuth:{
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      },
    },
      url: `http://localhost:${port}/v1`,
      description: 'Development server',
    },

    security:[
      {
        BearerAuth: []
      },
    ],
};

export const options = {
  swaggerDefinition,
  apis: ['./src/**/*.ts'],
}

const specs = swaggerJsdoc(options);

// Middlewares
const pinoHttp = PinoHttp();
const HttpServer = express();

HttpServer.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
HttpServer.use(pinoHttp);
HttpServer.use(express.json());

HttpServer.get('/healthcheck', (req, res) => {
  res.status(200).send({
    status: 'up',
    timestamp: new Date().toISOString(),
  });
});

const secretKey = process.env.TOKEN_SECRET;

if (!secretKey) {
  throw new Error("Token secret key is missing");
}

const userRepository = new UserRepositoryImpl();
const jwtRepository = new JwtRepositoryImpl(secretKey);
const middlewares = new MiddlewareFactory(jwtRepository)

const userService = new UserServiceImpl(userRepository);
const authService = new AuthServiceImpl(userRepository);

const userHttpHandler = new UserHttpHandler(userService);
const authHttpHandler = new AuthHttHandler(authService, jwtRepository);

HttpServer.use("/v1/auth", authHttpHandler.registerRoutes());
HttpServer.use(middlewares.authenticateTokenMiddleware); 
HttpServer.use("/v1/users", userHttpHandler.registerRoutes());
HttpServer.use((req, res) => {
  console.warn(`404 Not Found: ${req.method} ${req.path}`);
  res.status(404).send('Not Found');
});

export { HttpServer, port };
