import {readFileSync} from 'fs'
import {join} from 'path'

export const SERVER_CONFIG = {
    host: 'localhost',
    port: 8443,

    // https://nodejs.org/api/https.html
    // https://nodejs.org/api/fs.html
    key: readFileSync(join(__dirname, 'key.pem')),
    cert: readFileSync(join(__dirname, 'cert.cer'))
}
