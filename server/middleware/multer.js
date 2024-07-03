const multer = require('multer');
const path = require('path');

// Configure storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/student/'); // Save files in the 'uploads/student' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Use a unique filename
  }
});

// Filter to allow only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
