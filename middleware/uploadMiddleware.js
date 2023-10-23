const multer = require('multer');

// Specify the destination and filename for uploaded files
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // The 'uploads' directory in your project root
//   },
//   filename: function (req, file, cb) {
//     var name = file.originalname;
//     name = name.split('.');
//     var ext = name[name.length-1];
//     console.log("----------filename ext:",ext);
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname+'-'+uniqueSuffix+'.'+ext);
//   }
// });
const upload = multer({
  storage: multer.memoryStorage(), // Temporarily store files in memory
  limits: {
      fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
});

// Create the multer instance with the storage configuration
// const upload = multer({ storage: storage });


exports.uploadfile = upload.single('Resume'); 
