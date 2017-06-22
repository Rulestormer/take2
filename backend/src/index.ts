import {createServer, ServerOptions} from 'spdy'
import {app} from './app'
import {logger, SERVER_CONFIG} from './shared/index'
const {host, port, key, cert} = SERVER_CONFIG

const options: ServerOptions = {
    // "shorthand" Properties fuer key und cert
    key,
    cert,
    spdy: {
        // protocols: ['h2', 'http/1.1']
        protocols: ['h2'],
        // kein reines TCP/IP, sondern nur mit TLS
        plain: false
    }
}

createServer(options, app as any).listen(port, host, () => {
    logger.info(`Node ${process.version}`)
    logger.info(`Der Server ist gestartet: https://${host}:${port}`)
})