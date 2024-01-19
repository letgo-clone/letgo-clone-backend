import express, { Express, NextFunction, Request, Response } from 'express';
import path from 'path';

require('dotenv').config();

const app: Express = express();
const PORT = process.env.PORT || 8080;


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

const authRoutes = require('./routes/auth');
const advertRoutes = require('./routes/advert');
const memberRoutes = require('./routes/member');

app.use('/oauth', authRoutes);
app.use('/advert', advertRoutes);
app.use('/account', memberRoutes);

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