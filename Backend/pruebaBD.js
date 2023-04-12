const db = require('./controlers/DB');
const Local = require('../Backend/Schema/localSchema.js');



await db.connectDB();
console.log("asdasdasda");
Local.find().then(data=>console.log(data));
db.disconnectDB();













