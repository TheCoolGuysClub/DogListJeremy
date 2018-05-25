const mongoose = require('mongoose');
//'mongodb://localhost:27017/assignmentLink'
const database = process.env.MONGODB_URI ||
                 'mongodb://localhost:27017/assignmentlink';
mongoose.connect(database)
  .then(() => {
    console.log(`Database up on ${database}`);
  })
  .catch((e) => {
    console.log('Unable to connect to database');
  })

module.exports = mongoose;
