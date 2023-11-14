import express, { Express, Request, Response } from 'express';
import path from 'path';

const app: Express = express();
const PORT = 8080;

// Cors
import cors from 'cors';
const corsOptions = require('./config/corsOptions');

// Redis
const redis = require('./helpers/redis');

// Middlewares
const credentials = require('./middleware/credentials');
const errorHandler = require('./middleware/errorHandler')

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

app.use(errorHandler);

const startUp = async () => {
    try {
        await redis.RedisClient.connect();
    }
    catch(err){
        console.error(err);
    }

    app.listen(PORT, () => {
        console.log('started at ' + PORT);
    })
}
startUp();