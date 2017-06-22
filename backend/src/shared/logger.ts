import {Logger, LoggerInstance, transports} from 'winston'
import {DB_CONFIG, LOG_CONFIG} from './config'

function loggerConfig(): LoggerInstance {
    'use strict'
        const logger: LoggerInstance = new (Logger)({
        transports: [
            new (transports.Console)(LOG_CONFIG.console),
            new (transports.File)(LOG_CONFIG.file)
        ]
    })

    logger.info('Logging durch Winston ist konfiguriert')
    return logger
}

export const logger = loggerConfig()

DB_CONFIG.connection.once(
    'open', () => logger.info(
                `Die DB-Verbindung zu "${DB_CONFIG.dbname}" ist hergestellt`))
