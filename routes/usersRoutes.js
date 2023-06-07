const express = require("express");
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

const verfiyUserToken = require("../utils/verfiyUserToken");
const verfiyAdminToken = require("../utils/verfiyAdminToken");

const {
  signUp,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  login,
  uploudImage
} = require("../controllers/userController");
const {
  loginValidation,
  signupValidation,
} = require("../utils/authenticationSchema");

// registration create new user
router.post("/signup", signupValidation, signUp);

//login 
router.post("/login", loginValidation, login);

//get all users
router.get("/",verfiyUserToken, getAllUsers);

//get user by id
router.get("/:id",verfiyUserToken, getUserById);


// update user  put or patch
router.patch("/:id",verfiyAdminToken, updateUser);

// delete user
router.delete("/:id",verfiyAdminToken, deleteUser);


// multer api and controller
router.post('/profile', upload.single('avatar'),uploudImage)



module.exports = router;
