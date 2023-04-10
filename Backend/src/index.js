const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

// creamos server
const app = express();

// importing routes
const indexRoutes = require('../routes/local');
const userRoutes = require('../routes/usuario');
//const pedidoRoutes = require('../routes/pedido');

// settings
app.set('port', process.env.PORT || 4000);

// middlewares
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../public/uploads'),
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
})
app.use(multer({ storage }).single('image'));

// routes
app.use('/', indexRoutes);
app.use('/user', userRoutes);

//static files

app.use(express.static(path.join(__dirname, '../public')));

// starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});