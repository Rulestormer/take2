export const LOG_CONFIG = {
    console: {
        colorize: true,
        prettyPrint: true,
        humanReadableUnhandledException: true
    },
    file: {
        // default: winston.log
        filename: 'server.log',
        level: 'debug',
        // 250 KB
        maxsize: 250000,
        maxFiles: 3,
        json: false,
        zippedArchive: true
    }
}