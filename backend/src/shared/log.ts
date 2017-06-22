import {inspect} from 'util'

import {logger} from './logger'

export function log(
    target: Object, key: string|symbol, descriptor: any): MethodDecorator {
    'use strict'
    const originalMethod = descriptor.value

    // keine Arrow Function wg. this im Funktionsrumpf
    // Spread-Parameter ab ES 2015
    // tslint:disable-next-line:only-arrow-functions
    descriptor.value = function(...args: Array<any>) {
        const klasseAsString = target.toString()
        // indexOf: Zaehlung ab 0. -1 bedeutet nicht enthalten
        // bei Klassen mit toString() werden ggf. Attributwerte nach einem ":""
        // ausgegeben
        const positionColon = klasseAsString.indexOf(':')
        const klassenname = positionColon === -1 ?
            klasseAsString :
            klasseAsString.substring(0, positionColon)

        if (args.length === 0) {
            logger.debug(`> ${klassenname}.${key}()`)
        } else {
            // Gibt es Request- oder Response-Objekte von Express?
            if (containsRequestResponse(args)) {
                logger.debug(
                    `> ${klassenname}.${key}(): args = <RequestResponse>`)
            } else {
                try {
                    logger.debug(
                        `> ${klassenname}.${key}(): args = `
                        + JSON.stringify(args))
                    // tslint:disable-next-line:variable-name
                } catch (TypeError) {
                    // TypeError bei stringify wegen einer zykl. Datenstruktur
                    // const obj = {a: "foo", b: obj}
                    // https://nodejs.org/api/util.html
                    logger.debug(
                        `> ${klassenname}.${key}(): args = ${inspect(args)}`)
                }
            }
        }

        const result = originalMethod.apply(this, args)
        let resultStr: string
        if (result === undefined) {
            resultStr = 'void || undefined'
        } else if (isPromise(result)) {
            resultStr = '<Promise>'
        } else {
            resultStr = JSON.stringify(result)
        }
        logger.debug(`< ${klassenname}.${key}(): result = ${resultStr}`)

        return result
    }

    return descriptor
}

function containsRequestResponse(args: Array<any>) {
    'use strict'
    return args.filter(arg => arg !== undefined)
               .find(arg => isRequest(arg) || isResponse(arg))
        !== undefined
}

function isRequest(arg: any) {
    'use strict'
    return arg.method !== undefined && arg.httpVersion !== undefined
}

function isResponse(arg: any) {
    'use strict'
    return arg.statusCode !== undefined
}

function isPromise(result: any) {
    'use strict'
    return result !== undefined && result.model !== undefined
        && result.schema !== undefined
}
