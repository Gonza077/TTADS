const mongoose = require('mongoose');

exports.connectDB = async () => {
    mongoose.connect('mongodb://127.0.0.1:27017/PedidosYaNot', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true,
        useFindAndModify:false
    })
    .then(() =>{
        //console.log("DB Open");
    })
    .catch((err) => {
        console.log(err);
    });
}

exports.disconnectDB = async () =>{
    mongoose.connection.close()
    .then(() =>{
        //console.log("DB Closed");
    } )
    .catch((err) =>{
        console.log(err)
    });
}