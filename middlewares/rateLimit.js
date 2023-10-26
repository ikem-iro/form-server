const rateLimit = require('express-rate-limit');

const registerRateLimit = rateLimit({
    windowMs: 3 * 60 * 1000,  
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true
});




module.exports = registerRateLimit;