import express, {Express} from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/auth';
import taskRoutes from './routes/task';
import adminTaskRoutes from './routes/admin.task';

dotenv.config();




const app: Express = express();
const urlencoded_body_parser = bodyParser.urlencoded({
    extended: true
});

app.use(bodyParser.json());
app.use(urlencoded_body_parser);

app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', taskRoutes);
app.use('/api/v1/admin', adminTaskRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
