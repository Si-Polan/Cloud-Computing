const winston = require('winston');

// Create a logger with the specified transports
const logger = winston.createLogger ({
    level: 'info', // Set the minimum logging level
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json() // Use JSON format for logs
    ), 
    transports: [
        new winston.transports.Console(), // Log to the console
        // Add other transports if needed (e.g., file transport)
    ],
});

// If in production, also log to a file
if (process.env.NODE_ENV === 'production') { 
    logger.add(
        new winston.transports.File({
            filename: 'error.log',
            level: 'error', // Log errors to a separate file 
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        })
    );
}
module.exports = logger;
