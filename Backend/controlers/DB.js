const mongoose = require('mongoose');

exports.connectDB = async () => {
    mongoose.connect('mongodb://localhost/PedidosYaNot', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true,
        useFindAndModify:true
    })
    .then(() => {
        //console.log('DB Connected');
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

