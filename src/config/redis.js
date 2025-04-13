// src/config/redis.js
const redis = require('redis');

const {
  REDIS_HOST = 'redis',
  REDIS_PORT = 6379,
  REDIS_PASSWORD = '',
} = process.env;

// Create and export a Redis client
const redisClient = redis.createClient({
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT,
  },
  password: REDIS_PASSWORD || undefined,
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

async function connectRedis() {
  await redisClient.connect();
  console.log(`Redis connected at ${REDIS_HOST}:${REDIS_PORT}`);
}

module.exports = {
  redisClient,
  connectRedis,
};
