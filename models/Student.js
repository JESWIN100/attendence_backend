const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  email:String,
  name: String,
  studentId: String, // This will be encoded in QR
});

module.exports = mongoose.model('Student', studentSchema);
