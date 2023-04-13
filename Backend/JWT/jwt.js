const jwt = require('jsonwebtoken');

function verifyToken (req, res, next)  {
    if (!req.headers.authorization) {
        return res.status(401).send("Request no autorizada")
    };

    const token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send("Request no autorizada")
    };

    const payload = jwt.verify(token, 'secretKey');
    req.userId = payload._id;
    next();
}

module.exports = verifyToken;