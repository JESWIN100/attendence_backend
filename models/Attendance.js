const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Attendance', attendanceSchema);
