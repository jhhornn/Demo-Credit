import express from 'express';
import { urlencoded, json } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import Routes from './routes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());

app.use('/api/v1/', Routes.apiRouter);


export default app;
