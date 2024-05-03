import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import PinoHttp from 'pino-http';
import { UserHttpHandler } from './user_http_handler';
import { UserServiceImpl } from '../../core/application/user_service_impl';
import { UserRepositoryImpl } from '../outbound/user_repository_impl';
import { config } from '../../infrastructure/config/config';

const HttpServer = express();
const port = process.env.PORT || 5000;

// Swagger definition
const swaggerDefinition = {
  info: {
    title: 'Express API with Swagger',
    version: '1.0.0',
    description: 'train smart application',
  },
  servers: [
    {
      url: `http://localhost:${port}/v1`,
      description: 'Development server',
    },
  ],
};

const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ['./src/**/*.ts'],
});

// Middlewares
const pinoHttp = PinoHttp();
HttpServer.use(pinoHttp);
HttpServer.use(express.json());

HttpServer.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

HttpServer.get('/healthcheck', (req, res) => {
  res.status(200).send({
    status: 'up',
    timestamp: new Date().toISOString(),
  });
});

const userRepository = new UserRepositoryImpl();

HttpServer.use("/v1/users", new UserHttpHandler(new UserServiceImpl(userRepository)).registerRoutes());
HttpServer.use((req, res) => {
  console.warn(`404 Not Found: ${req.method} ${req.path}`);
  res.status(404).send('Not Found');
});

export { HttpServer, port };
