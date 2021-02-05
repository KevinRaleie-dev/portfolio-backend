import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 minutes
  max: 5,
  message: 'Too many requests from this IP, try again after 15 minutes',
});
