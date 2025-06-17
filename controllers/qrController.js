const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const Student = require('../models/Student');
require('dotenv').config();

exports.generateQR = async (req, res) => {
  const { studentId } = req.body;

  if (!studentId) return res.status(400).json({ message: 'Student ID is required' });

  try {
    const student = await Student.findOne({ studentId });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const qrDir = path.join(__dirname, '../qrcodes');
    if (!fs.existsSync(qrDir)) fs.mkdirSync(qrDir);

    const fileName = `${student.name.replace(/\s/g, '_')}.png`;
    const filePath = path.join(qrDir, fileName);

    await QRCode.toFile(filePath, studentId, {
      color: { dark: '#000', light: '#FFF' },
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"Your School Name" <${process.env.EMAIL_USER}>`,
      to: student.email,
      subject: 'Your Attendance QR Code',
      text: `Hello ${student.name},\n\nHere is your unique QR code for attendance marking.\n\nBest regards,\nAdmin`,
      attachments: [{ filename: fileName, path: filePath }]
    };

    await transporter.sendMail(mailOptions);

    console.log(`QR code sent to ${student.email}`);
    res.status(200).json({ message: 'QR code generated and sent via email', file: fileName });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
