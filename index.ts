import express, { Express, Request, Response } from 'express';
import path from 'path';

const app: Express = express();
const PORT = 8080;

// Cors
import cors from 'cors';
const corsOptions = require('./config/corsOptions');

// Middlewares
const credentials = require('./middleware/credentials');

app.use(credentials);
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/static", express.static(path.join(__dirname, "public")));

const authRoutes = require('./routes/auth')

app.use('/oauth', authRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Express + Typesciprt Server')
});


const startUp = async () => {
    app.listen(PORT, () => {
        console.log('started at ' + PORT);
    })
}
startUp();