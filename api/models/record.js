const mongoose = require('mongoose');
  
const recordSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type :String, require:true},
    salary: {type: Number}
});

module.exports = mongoose.model('Record',recordSchema);