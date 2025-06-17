const Attendance = require('../models/Attendance');
const Student = require('../models/Student');

exports.markAttendance = async (req, res) => {
  const { studentId } = req.body;
  try {
    const student = await Student.findOne({ studentId });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const attendance = new Attendance({ student: student._id });
    await attendance.save();

    res.status(200).json({ message: 'Attendance marked', attendance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
