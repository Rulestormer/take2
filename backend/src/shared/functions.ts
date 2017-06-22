import {Request, Response} from 'express'
// https://nodejs.org/api/fs.html
import {readFile as fsReadFile} from 'fs'

import {logger} from './logger'

/**
 * Abfrage, ob ein String leer oder <code>null</code> oder
 * <code>undefined</code> ist.
 */
export function isEmpty(obj: string|undefined) {
    'use strict'
    return obj === undefined || obj === ''
}

/**
 * Abfrage, ob ein Objekt ein String ist.
 */
export function isString(obj: any) {
    'use strict'
    return typeof obj === 'string'
}

/**
 * Asynchrone Function readFile von Node.js erfordert ein Callback und wird
 * in ein Promise gekapselt, damit spaeter async/await verwendet werden kann.
 */
export async function readFile(filename: string) {
    'use strict'
    return new Promise<string>((resolve, reject) => {
        fsReadFile(
            filename, 'utf8',
            (error, data) => error ? reject(error) : resolve(data))
    })
}

export const responseTimeFn: (req: Request, res: Response, time: number) =>
    void = (req: Request, res: Response, time: number) => {
        logger.debug(`Response time: ${time} ms`)
    }

/**
 * Ein Benutzernamen und ein Passwort werden zu einem String zusammengefasst und
 * dabei durch einen Doppelpunkt (:) getrennt. Dieser String wird
 * anschlie&szlig;end mit Base64 codiert. Das Ergebnis kann dann f&uuml;
 * BASIC-Authentifizierung verwendet werden.
 * @param username Der Benutzername
 * @param password Das Passwort
 * @return Der mit Base64 codierte String.
 */
export function toBase64(username: string, password: string) {
    'use strict'
    // http://stackoverflow.com/questions/34177221/angular2-how-to-inject-window-into-an-angular2-service
    // https://gist.github.com/gdi2290/f8a524cdfb1f54f1a59c
    return window.btoa(`${username}:${password}`)
}