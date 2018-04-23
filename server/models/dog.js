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
  }

})

const Dog = mongoose.model('Dog', dogSchema);

module.exports = {Dog};
