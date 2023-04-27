const jwt = require('jsonwebtoken');

function addInfo(req, res) {
    // res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    // res.set('Access-Control-Allow-Origin: *');
    // res.set('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    // res.set('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
}

function verifyToken (req, res, next)  {
    //addInfo(req, res);
    
    //------------------FALTA LA GENERACION DE LOS TOKENSY VALIDACION //------------------      

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