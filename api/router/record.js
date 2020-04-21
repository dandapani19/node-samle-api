const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth =require('../middleware/check-auth');

const storage =multer.diskStorage({
  destination: function(req,file,cb){
    cb(null, './uploads');
  },
  filename: function(req,file, cb){
    cb(null, new Date().toISOString()+file.originalname);
  }
});
 
const upload = multer({storage: storage});

const Record = require('../models/record');
// Get user information
router.get('/',checkAuth,(req, res, next) =>{
  Record.find()
  .exec()
  .then(doc =>{
    console.log('------>dec---->',doc);
    res.status(200).json({
      message: 'Handling GET request to /user',
      data:doc
    });
  })
  .catch(err =>{ res.status(404).json(err)})
   
});
// Add user information
router.post('/',checkAuth, upload.single('productImage'), (req, res, next) =>{
console.log(req.file);
    const record = new Record({
      _id: new mongoose.Types.ObjectId(),
      name:req.body.name,
      salary:req.body.salary
    });
    record
    .save()
    .then(data =>{
           console.log('---------->data------>',data);
           res.status(200).json({
            message: 'Record created success',
            user:user
          });      
    })
    .catch(err => console.log(err));
    
});

//Get perticular user information
router.get('/:recordid',checkAuth,(req, res) =>{
    const id= req.params.userid;
    Record.findById(id)
    .exec()
    .then( doc =>{
         console.log('-------->get user data---->',doc);
         if(doc) res.status(200).json(doc);
         else res.status(404).json({message: 'No valid data entry founod'});
         
    }) 
    .catch(err =>{
      console.log('------error---->',err);
    })
});

// Update user inforamtion
router.patch('/:recordid',checkAuth,(req, res) =>{
  const id= req.params.userid;
 
Record.update({_id :id },{ $set: {name: req.body.name , salary:req.body.salary} })
.exec()
.then(data =>{
res.status(200).json(data)
})
.catch(err =>{
  res.status(404).json(err)
})
});


// Delete user information
router.delete('/:recordid',checkAuth,(req, res) =>{
  const id= req.params.userid;
 
  Record.destroy({_id :id })
  .exec()
  .then(data =>{
  res.status(200).json(data)
  })
  .catch(err =>{
    res.status(404).json(err)
  })
});

module.exports = router;