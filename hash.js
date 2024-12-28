const {pbkdf2Sync, randomBytes} = require("crypto")


const options = {
    keyLength: 64,
    iterations: 600000,
}
function getSalt() {
    return randomBytes(32).toString('hex')
}
function hashPassword(password) {
    const salt = getSalt()
    const hash = pbkdf2Sync(password, salt, options.iterations, options.keyLength, 'sha512').toString('hex')
    return `${options.iterations}$${options.keyLength}$${hash}$${salt}`
}

console.log(hashPassword("Azerty123!"))