import * as express from 'express'
import {SERVER_CONFIG} from './config'

export function getBaseUri(req: express.Request) {
    'use strict'
    return `${req.protocol}://${req.hostname}:${SERVER_CONFIG.port}`
        + req.originalUrl
}
