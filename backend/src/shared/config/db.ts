import * as mongoose from 'mongoose'
import {connect, connection} from 'mongoose'
import * as credentials from './credentials'

export const DB_CONFIG: any = {
    // In Produktion auf false setzen
    autoIndex: true,

    // http://mongoosejs.com/docs/connections.html
    // https://github.com/mongodb/node-mongodb-native
    // Defaultwerte
    //      Port        27017
    //      Poolsize    5
    host: '127.0.0.1',
    dbname: 'take2',
    url: undefined,
    options: {
        user: credentials.username,
        pass: credentials.password,
        auth: {
            authdb: 'admin'
        }
    },
    connection: undefined
}

// Die Mongoose-eigenen Promises sind deprecated
// Die Promises aus ES2015 als Promise-Library bereitstellen
const mongooseAny: any = mongoose
mongooseAny.Promise = Promise

DB_CONFIG.url = `mongodb://${DB_CONFIG.host}/${DB_CONFIG.dbname}`
connect(DB_CONFIG.url, DB_CONFIG.options)

DB_CONFIG.connection = connection
DB_CONFIG.connection.on(
    'error', console.error.bind(
                 console, 'FEHLER beim Aufbau der Datenbank-Verbindung:\n'))
