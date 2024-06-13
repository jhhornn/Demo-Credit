import express from 'express';
import { urlencoded, json } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { Request, Response } from 'express';
// import knexConfig from './config/db/knexfile';
import db from './config';
// import db from './config/db';

const database = db.db.database
const app = express();

app.use(helmet());

// adds middleware for cross-origin resource sharing configuration
app.use(cors());

// adds middleware that parses requests with x-www-form-urlencoded data encoding
app.use(urlencoded({ extended: true }));

// adds middleware that parses requests whose content-type is application/json
app.use(json());


app.get('/', async (req: Request, res: Response) => {
    const users = await database('users').select('*');
    res.json({users});
    // res.send('Hello World');
})

// app.get('/:id', (req: Request, res: Response) => {
//     // db
//     res.send({
//         data: req.params.id
//     });
// })

app.post('/', (req: Request, res: Response) => {
    res.send({
        data: req.body
    })
})

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})