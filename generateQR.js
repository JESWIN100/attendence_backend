const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Make sure the output folder exists
const outputDir = path.join(__dirname, 'qrcodes');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Example student list
const students = [
  { name: 'John Doe', studentId: 'STU12345' },
  { name: 'Jane Smith', studentId: 'STU67890' },
  { name: 'Ali Khan', studentId: 'STU11223' }
];

students.forEach((student) => {
  const filePath = path.join(outputDir, `${student.name.replace(/\s+/g, '_')}.png`);
  QRCode.toFile(filePath, student.studentId, {
    color: {
      dark: '#000',
      light: '#FFF',
    },
  }, function (err) {
    if (err) throw err;
    console.log(`QR code generated for ${student.name}`);
  });
});
