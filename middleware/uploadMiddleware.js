const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(), // Temporarily store files in memory
  limits: {
      fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
});

// Create the multer instance with the storage configuration
// const upload = multer({ storage: storage });


exports.uploadfile = upload.single('Resume'); 
