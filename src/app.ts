import express from 'express';
import { urlencoded, json } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import Routes from './routes';
import errHandler from './utils/errHandler';

const app = express();

app.use(helmet());
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());

app.use('/api/v1/', Routes.apiRouter);
app.use(errHandler);

export default app;
