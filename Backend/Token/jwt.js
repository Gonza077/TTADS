const jwt = require('jsonwebtoken');

function addInfo(req, res) {
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
}

function verifyToken (req, res, next)  {
    addInfo(req, res);
    //------------------FALTA LA GENERACION DE LOS TOKENSY VALIDACION //------------------      
    console.log("Token validado");

    // if (!req.headers.authorization) {
    //      res.status(401).send("Request no autorizada")
    // };

    // const token = req.headers.authorization.split(' ')[1]
    // if (token === 'null') {
    //      res.status(401).send("Request no autorizada")
    // };

    // const payload = jwt.verify(token, 'secretKey');
    // req.userId = payload._id;
    next();
}

module.exports = verifyToken;