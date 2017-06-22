import * as compression from 'compression'
import * as cors from 'cors'
import * as express from 'express'

export const PATHS = {
    
}

function initApp() {
    'use strict'
    const app = express()

    app.use(
        cors({
            origin: 'https://localhost',
            credentials: true,
            methods: 'GET,HEAD,POST,PUT,DELETE',
            allowedHeaders: 'origin,content-type,accept,authorization,access-control-allow-origin,access-control-allow-methods,access-control-allow-headers,allow,content-length,date,last-modified,if-modified-since'
        }),
        compression())
    
    //app.get('*', notFound)
    //app.use(internalError)

    return app
}
export const app = initApp()