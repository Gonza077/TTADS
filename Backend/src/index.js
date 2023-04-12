const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
//-----------------------------ROUTES-----------------------------//
const localRoutes = require('../routes/localRoutes');
const userRoutes = require('../routes/userRoutes');
//-----------------------------ROUTES-----------------------------//

//-----------------------------SERVER-----------------------------//
const app = express();

//-----------IMPORTING ROUTES-----------//
app.use('/', localRoutes);
app.use('/user', userRoutes);

//-----------SETTINGS-----------//
app.set('port', process.env.PORT || 4000);

//-----------MIDDLEWARES-----------//
app.use(cors());
app.use(express.json());

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