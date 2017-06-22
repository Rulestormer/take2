import {ObjectID} from 'mongodb'
import {isHexadecimal} from 'validator'

import {isEmpty} from './functions'
import {logger} from './logger'

export function isMongoId(id: string) {
    'use strict'
    if (id === undefined) {
        return false
    }
    return !isEmpty(id) && id.length === 24 && isHexadecimal(id)
}

export function generateMongoId() {
    'use strict'
    const id = new ObjectID()
    logger.debug(`id = ${JSON.stringify(id)}`)
    return id
}
