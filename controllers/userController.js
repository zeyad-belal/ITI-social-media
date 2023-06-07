const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const cloudinary = require("../utils/cloudinary");

// registration
const signUp = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("email and password required", 401));

  const newUser = await User.create({ email, password });
  newUser.password = undefined;
  res.send("signed up successfully");
};

//login
const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("email and password are requird", 401));

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new AppError("user not found", 404));

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return next(new AppError("invalid credentials", 404));

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );

  user.password = undefined;
  res.send({ user, token });
};

//get all users
const getAllUsers = async (req, res) => {
  const user = await User.find({ role: "user" }).populate("posts");
  res.send(user);
};

//get user by id
const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("posts");
  if (!user) return next(new AppError("user not found", 404));
  res.send(user);
};

// update user info
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;
  const user = await User.findByIdAndUpdate(
    id,
    { email, password },
    { new: true }
  );
  res.send(user);
};

// delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  res.send(user);
};

// uploud image
const uploudImage = async (req, res, next) => {
  const image = req.file;
  const { id } = req.params;

  // Upload
  const result = cloudinary.uploader.upload(image, { public_id: "user_image" });

  result.then((data) => {
      console.log(data);
      console.log(data.secure_url);
    })
    .catch((err) => {
      next(new AppError("couldnot uploud image please try again", 401));
      console.log(err);
    });

  // Generate
  const url = cloudinary.url("user_image", {
    width: 100,
    height: 150,
    Crop: "fill",
  });

  // The output url
  console.log(url);
  
  const userImage = {
    public_id: result.public_id,
    url: result.secure_url,
  };

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { image: userImage },
    { new: true }
  );

  res.send(updatedUser);
};


module.exports = {
  signUp,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  login,
  uploudImage,
};
