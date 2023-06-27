const rateLimitSettings = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
};

const accountLimitsSettings = {
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 2, // Limit each IP to 2 create account requests per `window` (here, per hour)
  message: "Too many accounts created from this IP, please try again later",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
};

module.exports = { rateLimitSettings, accountLimitsSettings };
