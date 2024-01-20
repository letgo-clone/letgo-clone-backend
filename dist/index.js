"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
require('dotenv').config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
// Swagger
const swagger_1 = __importDefault(require("./helpers/swagger"));
// Cors
const cors_1 = __importDefault(require("cors"));
const corsOptions = require('./config/corsOptions');
// Redis
const redis = require('./helpers/redis');
// Middlewares
const credentials = require('./middleware/credentials');
const errorHandler = require('./middleware/errorHandler');
app.use(credentials);
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/static", express_1.default.static(path_1.default.join(__dirname, "public")));
const authRoutes = require('./routes/auth');
const advertRoutes = require('./routes/advert');
const memberRoutes = require('./routes/member');
app.use('/oauth', authRoutes);
app.use('/advert', advertRoutes);
app.use('/account', memberRoutes);
app.use(errorHandler);
const startUp = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield redis.RedisClient.connect();
    }
    catch (err) {
        console.error(err);
    }
    app.listen(PORT, () => {
        console.log('started at ' + PORT);
    });
    (0, swagger_1.default)(app);
});
startUp();
