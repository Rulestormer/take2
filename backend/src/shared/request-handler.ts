import {NextFunction, Request, Response} from 'express'
import {isUUID} from 'validator'

import {isMongoId, log, logger} from './index'

class SharedRequestHandler {
    @log
    logRequestHeader(req: Request, res: Response, next: NextFunction) {
        logger.debug(
            `Request: headers=${JSON.stringify(req.headers, undefined, 2)}`)
        logger.debug(
            `Request: protocol=${JSON.stringify(req.protocol, undefined, 2)}`)
        logger.debug(
            `Request: hostname=${JSON.stringify(req.hostname, undefined, 2)}`)
        if (req.body !== undefined) {
            logger.debug(
                `Request: body=${JSON.stringify(req.body, undefined, 2)}`)
        }
        Object.keys(req).forEach(key => {
            if (req.hasOwnProperty(key)) {
                logger.log('silly', `Request-Key: ${key}`)
            }
        })

        // Request-Verarbeitung fortsetzen
        next()
    }

    @log
    validateMongoId(req: Request, res: Response, next: NextFunction, id: any) {
        logger.debug(`id = ${id}`)

        if (!isMongoId(id)) {
            logger.debug('status = 400')
            res.status(400).send(`${id} is not a valid ID`)
        }

        next()
    }

    @log
    validateUUID(req: Request, res: Response, next: NextFunction, id: any) {
        if (!isUUID(id)) {
            logger.debug('status = 400')
            res.status(400).send(`${id} is not a valid ID`)
            return
        }

        next()
    }

    @log
    notFound(req: Request, res: Response) {
        res.sendStatus(404)
    }

    @log
    internalError(err: any, req: Request, res: Response, next: NextFunction) {
        // tslint:disable-next-line:no-null-keyword
        logger.error(JSON.stringify(err, null, 2))
        res.sendStatus(500)
    }

    @log
    notYetImplemented(req: Request, res: Response) {
        logger.error('NOT YET IMPLEMENTED')
        res.sendStatus(501)
    }

    toString() {
        return 'SharedRequestHandler'
    }
}

// -----------------------------------------------------------------------
// E x p o r t i e r t e   F u n c t i o n s
// -----------------------------------------------------------------------
export function logRequestHeader(
    req: Request, res: Response, next: NextFunction) {
    'use strict'
    new SharedRequestHandler().logRequestHeader(req, res, next)
}

export function validateMongoId(
    req: Request, res: Response, next: NextFunction, id: any) {
    'use strict'
    new SharedRequestHandler().validateMongoId(req, res, next, id)
}

export function validateUUID(
    req: Request, res: Response, next: NextFunction, id: any) {
    'use strict'
    new SharedRequestHandler().validateUUID(req, res, next, id)
}

export function notFound(req: Request, res: Response) {
    'use strict'
    new SharedRequestHandler().notFound(req, res)
}

export function internalError(
    err: any, req: Request, res: Response, next: NextFunction) {
    'use strict'
    new SharedRequestHandler().internalError(err, req, res, next)
}

export function notYetImplemented(req: Request, res: Response) {
    'use strict'
    new SharedRequestHandler().notYetImplemented(req, res)
}

// https://github.com/expressjs/express/issues/2259
// https://github.com/expressjs/express/pull/2431
// https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators
export const wrap = (fn: Function) => (...args: Array<any>) =>
    fn(...args).catch(args[2])
