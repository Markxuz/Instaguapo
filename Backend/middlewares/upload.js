const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the settings folder exists
const settingsDir = "uploads/settings";
if (!fs.existsSync(settingsDir)) {
  fs.mkdirSync(settingsDir, { recursive: true });
}

// Configure Multer storage for hero images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, settingsDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

// Only accept image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed (jpg, jpeg, png)"));
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
