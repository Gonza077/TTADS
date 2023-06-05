const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const localRoutes = require('../routes/localRoutes');
const userRoutes = require('../routes/userRoutes');
const productRoutes = require('../routes/productRoutes');
const orderRoutes = require('../routes/orderRoutes');

//-----------------------------SERVER-----------------------------//
const app = express();


//-----------SETTINGS & MIDDLEWARES-----------//
app.set('port', process.env.PORT || 4000);
app.use(cors());
app.use(express.json());

//-----------IMPORTING ROUTES-----------//
app.use('/api/locals/', localRoutes);
app.use('/api/users/', userRoutes);
app.use('/api/users/orders/', orderRoutes);
app.use('/api/locals/products/', productRoutes);

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../public/uploads'),
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
})
app.use(multer({ storage }).single('image'));

//-----------STATIC FILES-----------//
app.use(express.static(path.join(__dirname, '../public')));

//-----------STARTING SERVER-----------//
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
//-----------STARTING SERVER-----------//