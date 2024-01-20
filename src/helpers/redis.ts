const Redis = require('redis');

const RedisClient = Redis.createClient({
    url: process.env.REDIS_URL
}); 

RedisClient.on('connect', () => {
    console.error('Redis bağlantı başarılı.')
})

RedisClient.on('error', (err: Error) => {
    console.error('Redis bağlantı hatası', err);
});

const setValue = async (key: string, exp: number, value: string[]) => {
    RedisClient.setEx(key, exp, JSON.stringify(value));
}

module.exports = { setValue, RedisClient }