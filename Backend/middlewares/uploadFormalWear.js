const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the folder exists
const wearDir = "uploads/formal_wear";
if (!fs.existsSync(wearDir)) {
  fs.mkdirSync(wearDir, { recursive: true });
}

// Multer config for formal wear
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, wearDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.test(ext)) cb(null, true);
  else cb(new Error("Only image files allowed"));
};

module.exports = multer({ storage, fileFilter });
