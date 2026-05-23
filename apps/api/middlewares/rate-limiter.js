import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import Redis from "ioredis";

const redisClient = new Redis({
  url: process.env.REDIS_URL || "redis://localhost:6379",
  maxRetriesPerRequest: null,
  enableOfflineQueue: false,
  retryStrategy: (times) => Math.min(times * 50, 2000),
});

let redisConnected = false;
let redisErrorLogged = false;

redisClient.on("connect", () => {
  console.log("✓ Connected with Redis for rate limiting");
  redisConnected = true;
  redisErrorLogged = false;
});

redisClient.on("error", (err) => {
  if (!redisErrorLogged) {
    console.warn(
      "⚠ Redis unavailable, using in-memory rate limiting:",
      err.message,
    );
    redisErrorLogged = true;
  }
  redisConnected = false;
});

const createRateLimiter = (windowMs, max, prefix, message) => {
  const limiterConfig = {
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      res.status(429).json({ message });
    },
  };

  // Try to use Redis if available, fallback to memory store
  if (redisConnected) {
    limiterConfig.store = new RedisStore({
      sendCommand: (...args) => redisClient.call(...args),
      prefix,
    });
  }

  return rateLimit(limiterConfig);
};

export const authLimiter = createRateLimiter(
  15 * 60 * 1000,
  5,
  "rl:auth",
  "Too many login attempts, Please try again after 15 minutes",
);

export const apiLimiter = createRateLimiter(
  15 * 60 * 1000,
  100,
  "rl:api:",
  "Too many requests. Please slow down.",
);
