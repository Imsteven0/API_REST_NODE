const userService = require('../auth/CredentialsAuth');

module.exports = basicAuth;

async function basicAuth(req, res, next) {
    const start = process.hrtime.bigint();

    if (req.path === '/users/authenticate') {
        return next();
    }

    // check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header', ResponseTime: `${Number(process.hrtime.bigint() - start) / 1e6}ms` });
    }

    // verify auth credentials
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    const user = await userService.authenticate({ username, password });
    if (user != 1) {
        return res.status(401).json({ message: 'Invalid Authentication Credentials', ResponseTime: `${Number(process.hrtime.bigint() - start) / 1e6}ms` });
    }

    req.user = user

    next();
}