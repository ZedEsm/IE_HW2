// const moment = require('moment');
// const winston = require('winston');
//
// const logger = winston.createLogger({
//     transports: [
//         new winston.transports.Console({
//             format: winston.format.combine(
//                 winston.format.timestamp({
//                     format: () => moment().format('YYYY-MM-DD HH:mm:ss')
//                 }),
//                 winston.format.json()
//             )
//         }),
//         new winston.transports.File({
//             filename: __dirname + '/debug.log',
//             format: winston.format.combine(
//                 winston.format.timestamp({
//                     format: () => moment().format('YYYY-MM-DD HH:mm:ss')
//                 }),
//                 winston.format.json()
//             )
//         })
//     ],
//     exceptionHandlers: [
//         new winston.transports.Console({
//             format: winston.format.combine(
//                 winston.format.timestamp({
//                     format: () => moment().format('YYYY-MM-DD HH:mm:ss')
//                 }),
//                 winston.format.json()
//             )
//         }),
//         new winston.transports.File({
//             filename: __dirname + '/exceptions.log',
//             format: winston.format.combine(
//                 winston.format.timestamp({
//                     format: () => moment().format('YYYY-MM-DD HH:mm:ss')
//                 }),
//                 winston.format.json()
//             )
//         })
//     ],
//     exitOnError: false
// });
//
// module.exports = logger;
const moment = require('moment');
const winston = require('winston');

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp({
                    format: () => moment().format('YYYY-MM-DD HH:mm:ss')
                }),
                winston.format.json()
            )
        }),
        new winston.transports.File({
            filename: __dirname + '/debug.log',
            format: winston.format.combine(
                winston.format.timestamp({
                    format: () => moment().format('YYYY-MM-DD HH:mm:ss')
                }),
                winston.format.json(),
                winston.format((info) => {
                    const { req } = info.metadata || {};
                    if (req) {
                        info.message += `\nRequest Line: ${req.method} ${req.originalUrl} HTTP/${req.httpVersion}`;
                    }
                    return info;
                })()
            )
        })
    ],
    exceptionHandlers: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp({
                    format: () => moment().format('YYYY-MM-DD HH:mm:ss')
                }),
                winston.format.json()
            )
        }),
        new winston.transports.File({
            filename: __dirname + '/exceptions.log',
            format: winston.format.combine(
                winston.format.timestamp({
                    format: () => moment().format('YYYY-MM-DD HH:mm:ss')
                }),
                winston.format.json(),
                winston.format((info) => {
                    const { req } = info.metadata || {};
                    if (req) {
                        info.message += `\nRequest Line: ${req.method} ${req.originalUrl} HTTP/${req.httpVersion}`;
                    }
                    return info;
                })()
            )
        })
    ],
    exitOnError: false
});

module.exports = logger;
