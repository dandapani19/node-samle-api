const mongoose = require('mongoose');
  
const diarySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    diary: {type: mongoose.Schema.Types.ObjectId, ref:"user"},
    notes: {type: String, require:true},
  
});

module.exports = mongoose.model('Diary',diarySchema);