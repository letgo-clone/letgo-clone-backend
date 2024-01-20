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
const Redis = require('redis');
const RedisClient = Redis.createClient({
    url: process.env.REDIS_URL
});
RedisClient.on('connect', () => {
    console.error('Redis bağlantı başarılı.');
});
RedisClient.on('error', (err) => {
    console.error('Redis bağlantı hatası', err);
});
const setValue = (key, exp, value) => __awaiter(void 0, void 0, void 0, function* () {
    RedisClient.setEx(key, exp, JSON.stringify(value));
});
module.exports = { setValue, RedisClient };
