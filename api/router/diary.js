const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth =require('../middleware/check-auth');
const Diary = require('../models/diary');

router.get('/',checkAuth,(req, res, next) =>{
  Diary.find()
  .exec()
  .then(doc =>{
    console.log('------>dec---->',doc);
    res.status(200).json({
      message: 'Handling GET request to /diary',
      data:doc
    });
  })
  .catch(err =>{ res.status(404).json(err)})
});

router.post('/',checkAuth,(req, res,next) =>{
  const diary = new Diary({
    _id: new mongoose.Types.ObjectId(),
    diary:req.body.userId,
    notes:req.body.notes
  });
  diary
  .save()
  .then(data =>{
         console.log('---------->data------>',data);        
         res.status(200).json({
          message: 'Diary created success',
          user:data
        });
  })
  .catch(err => console.log(err));
 
});


module.exports = router;