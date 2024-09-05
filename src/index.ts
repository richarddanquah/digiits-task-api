import express, { Express } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

import authRoutes from './routes/auth';
import taskRoutes from './routes/task';
import adminTaskRoutes from './routes/admin.task';
import adminUserRoutes from './routes/admin.user';

dotenv.config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DIGIITS Task Management API',
      version: '1.0.0',
      description: 'NodeJS API Documentation for Digiits Task Management System',
      contact: {
        name: 'Digiits Team',
        email: 'digiits.team@gmail.com',
        url: 'https://digiits.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:6000/api/v1',
        description: 'Development server',
      },
    ],
  },
  apis: ['./dist/routes/*.js']
};

const specs = swaggerJSDoc(options);

const app: Express = express();

app.use('/apidocswag', swaggerUI.serve, swaggerUI.setup(specs));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', taskRoutes);
app.use('/api/v1/admin', adminTaskRoutes);
app.use('/api/v1/admin/users', adminUserRoutes);

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('API docs available at http://localhost:6000/apidocswag');
});
