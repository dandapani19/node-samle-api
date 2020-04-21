const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const recordRoutes = require('./api/router/record');
const diaryRoutes = require('./api/router/diary');
const userRoutes = require('./api/router/user');

mongoose.connect('mongodb+srv://node-shop:'+ process.env.MONGO_ATLUS_PW +'@node-shope-grm7a.mongodb.net/test?retryWrites=true&w=majority');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
 
// app.use((req, res) =>{
//  res.header('Access-Control','*');
//  res.header(
//      "Access-Control",
//      "Origin, X-Requested-With, Conten-Type, Accept, Authorization"
//  );
//  if(req.method === 'OPTIONS'){
//      req.header('Access-Control','PUT','POST','PATCH','DELETE','GET');
//      return res.status(200).json({});
//  }
// });

// Router which should handle router
app.use('/user',userRoutes);
app.use('/record',recordRoutes);
app.use('/diary',diaryRoutes);
   
app.use((req, res, next) =>{
const error = new Error('Not fount');
error.status=404;
next(error);
});

app.use((error, req, res, next) =>{
    res.status(error.status || 500 );
    res.json({
        error:{
            message: error.message
            
        }
    })
    });
module.exports = app;