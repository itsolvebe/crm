const multer = require("multer");

// Specify storage destination and filename
const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    const originalname = file.originalname;
    const extension = originalname.split(".").pop();
    const fileName = originalname.replace(/\.[^/.]+$/, "");

    // Validate file name and extension
    if (fileName.includes(" ")) {
      const error = new Error("File name cannot contain spaces");
      error.code = "INVALID_FILENAME";
      return cb(error);
    }

    if (!extension.match(/(png|jpg|jpeg)$/i)) {
      const error = new Error("Only PNG, JPG, and JPEG files are allowed");
      error.code = "INVALID_EXTENSION";
      return cb(error);
    }

    cb(null, originalname);
  },
});

// Create Multer instance
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Handle the error thrown by filename function
    try {
      if (file.originalname.includes(" ")) {
        throw new Error("INVALID_FILENAME");
      }
      cb(null, true);
    } catch (error) {
      const { message, code } = error;
      cb({ message, code });
    }
  },
});

// Middleware to handle Multer errors
const handleMulterErrors = (req, res, next) => {
  upload.single("picture")(req, res, (err) => {
    if (err) {
      console.log("Errror", err);
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res
          .status(400)
          .json({ error: "Only single file upload is allowed" });
      }
      if (
        err.message === "INVALID_FILENAME" ||
        err.code === "INVALID_EXTENSION"
      ) {
        return res.status(400).json({ error: err });
      }
      return res.status(500).json({ error: "Internaaaaaaaaal server error" });
    }
    next();
  });
};

module.exports = {
  upload,
  handleMulterErrors,
};
