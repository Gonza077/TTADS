const db = require('./controlers/DB');
const Local = require('./models/localSchema');
const Producto = require('./models/productoSchema');

db.connectDB();
/*
Local.find()
.then((docs) =>{
    console.log(docs.forEach(prod => console.log(prod)));
})
.finally(()=>{
    db.disconnectDB();
});
*/









