export const JWT_CONFIG = {
    typ: 'JWT',

    alg: 'RS256',

    encoding: 'utf8',
    issuer: 'https://hska.de/shop/JuergenZimmermann',
    secret: 'p',
    expiration: 24 * 60 * 60,  // 1 Tag in Sek.
    bearer: 'Bearer'
}