const mongoose = require('mongoose');
const dogSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
  },
  age: {
    type: Number,
    required: true
  },
  picture: {
    type: String
  },
  personality: {
    type: String,
    minLength: 1
  },
  description: {
    type: String,
    minLength: 1
  }

})

const Dog = mongoose.model('Dog', dogSchema);

module.exports = {Dog};
