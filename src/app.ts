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

app.get("/", (req, res, next) => {
    res.send(
      "<h1 style='color: black;text-align: center'>Welcome to <span style='color: blue'>Demo Credit API</span> Service!</h1>\
       <br> <h3 style='color: black;text-align: center'>Click <a href='https://elements.getpostman.com/redirect?entityId=22998842-8f75ca4a-103a-4a38-8aa6-e44a262ece59&entityType=collection'>here</a> to get started</h3>"
    )
    next()
  })

app.use(errHandler);

export default app;

