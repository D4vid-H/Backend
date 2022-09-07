import winston from 'winston';

const logger = winston.createLogger({
    level: 'warn',
    transports : [
        new winston.transports.Console({ level:'verbose' }),
    ]
 })

const loggers = (req, res, next) => {
       const metodo = req.method;
       const url =  req.url;
       logger.log('info', req.method);
       logger.log('info', req.url);
    //logger.log('info', "127.0.0.1 - log silly")
    next();
};

const loggerWarning = (req, res, next) => {
    const metodo = req.method;
    const url =  req.url;
    logger.log('warn', req.method);
    logger.log('warn', req.url);
 //logger.log('info', "127.0.0.1 - log silly")
 next();
};

export {loggers, loggerWarning }