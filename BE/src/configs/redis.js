import redis from 'redis';
import dotenv from 'dotenv';

dotenv.config()
const {REDIS_PORT, REDIS_USERNAME, REDIS_PASSWORD} = process.env;
const configRedis = redis.createClient({
  socket: {
    host: REDIS_USERNAME,
    port: REDIS_PORT,
  },
  password: REDIS_PASSWORD
});
export default configRedis;