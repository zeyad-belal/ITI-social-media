const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

const User = require("../models/user");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_KEY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "DEV",
  },
});

const upload = multer({
  storage: storage,
});

const uploadToMulter = upload.single("pp");

const uploadPP = async (req, res) => {
  const user = req.user;
  const newUser = await User.updateOne(
    { _id: user._id },
    { $set: { profilePicture: req.file.path } }
  );
  console.log(newUser);
  res.send(newUser);
};

module.exports = { uploadToMulter, uploadPP };