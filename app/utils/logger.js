const moment = require('moment');
const winston = require('winston');

function getTimestampFormat() {
    return winston.format.timestamp({
        format: () => moment().format('YYYY-MM-DD HH:mm:ss')
    });
}

function getRequestLineFormat() {
    return winston.format((info) => {
        const { req } = info.metadata || {};
        if (req) {
            info.message += `\nRequest Line: ${req.method} ${req.originalUrl} HTTP/${req.httpVersion}`;
        }
        return info;
    })();
}

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                getTimestampFormat(),
                winston.format.json(),
            ),
        }),
        new winston.transports.File({
            filename: __dirname + '/debug.log',
            format: winston.format.combine(
                getTimestampFormat(),
                winston.format.json(),
                getRequestLineFormat(),
            ),
        }),
    ],
    exceptionHandlers: [
        new winston.transports.Console({
            format: winston.format.combine(
                getTimestampFormat(),
                winston.format.json(),
            ),
        }),
        new winston.transports.File({
            filename: __dirname + '/exceptions.log',
            format: winston.format.combine(
                getTimestampFormat(),
                winston.format.json(),
                getRequestLineFormat(),
            ),
        }),
    ],
    exitOnError: false,
});

module.exports = logger;
