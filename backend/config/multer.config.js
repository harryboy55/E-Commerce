const multer = require('multer');
const path = require('path');

// Set storage engine for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the folder for storing images
  },
  filename: function (req, file, cb) {
    const fileExt = path.extname(file.originalname); // Extract file extension
    cb(null, Date.now() + fileExt); // Save the image with a unique timestamp-based filename
  },
});

// File filter function to allow only image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Invalid file type'), false); // Reject file
  }
};

// Multer configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

module.exports = upload;
