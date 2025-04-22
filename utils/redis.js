import Redis from 'ioredis';

// Configure the Redis client
const redis = new Redis({
    host: '127.0.0.1', // Laragon Redis server
    port: 6379,        // Default Redis port
    db: 0,             // Default database
    password: null,    // Set a password in the Redis configuration if required
});

export default redis;
