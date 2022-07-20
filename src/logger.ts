/*
    Basado en https://github.com/winstonjs/winston#usage.
    Esta implementación de logger permitirá hacer uso de transports personalizados
    https://github.com/winstonjs/winston#transports
*/

import winston, { format } from "winston";
// eslint-disable-next-line
require("dotenv").config();

const logger = winston.createLogger({
    level: "info",
    format: format.combine(
        format.timestamp(),
        format.json(),
        format.metadata(),
        format.simple()
    )
});

if(process.env.NODE_ENV !== "production") 
{
    logger.add(new winston.transports.File({ 
        filename: "logs/error.log", level: "error" 
    }));
    logger.add(new winston.transports.File({ 
        filename: "logs/combined.log", level: "http" 
    }));
    logger.add(new winston.transports.File({ 
        filename: "logs/combined.log" 
    }));
    logger.add(new winston.transports.Console({
        level: "debug",
        format: format.combine(
            format.colorize(),
            format.simple()
        )
    }));
}
else
{
    logger.add(new winston.transports.Console({ 
        level: "debug", handleExceptions: true 
    }));
}

export default logger;
