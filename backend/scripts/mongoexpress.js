/*
 * Copyright (C) 2016 - 2017 Juergen Zimmermann, Hochschule Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* global require, process, __dirname */

const slash = require('slash')
const path = require('path')
const shell = require('shelljs')

const httpsDir = slash(path.join(__dirname, '..', 'config', 'https'))
const key = slash(path.join(httpsDir, 'key.pem'))
const cert = slash(path.join(httpsDir, 'cert.cer'))

const mongoExpressEnv ='export VCAP_APP_PORT=8088' +
    '&& export ME_CONFIG_MONGODB_SERVER=127.0.0.1' +
    '&& export ME_CONFIG_MONGODB_ENABLE_ADMIN=true' +
    '&& export ME_CONFIG_MONGODB_ADMINUSERNAME=admin' +
    '&& export ME_CONFIG_MONGODB_ADMINPASSWORD=p' +
    '&& export ME_CONFIG_MONGODB_AUTH_DATABASE=true' +
    '&& export ME_CONFIG_MONGODB_AUTH_USERNAME=admin' +
    '&& export ME_CONFIG_MONGODB_AUTH_PASSWORD=p' +
    '&& export ME_CONFIG_BASICAUTH_PASSWORD=p' +
    '&& export ME_CONFIG_SITE_SSL_ENABLED=true' +
    `&& export ME_CONFIG_SITE_SSL_KEY_PATH=${key}` +
    `&& export ME_CONFIG_SITE_SSL_CRT_PATH=${cert}`

// ggf. --version
const mongoExpressPath =
    path.join(process.env.NPM_CONFIG_PREFIX, 'node_modules', 'mongo-express')
shell.exec(`${mongoExpressEnv}&& cd node_modules/mongo-express && node app.js`)
