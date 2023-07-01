const asyncHandler = require("express-async-handler");
const User = require("../model/User.js");
const generateToken = require("../utils/generateToken.js");

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;
  console.log(firstName, lastName, email, password, phoneNumber);
  // check if email exists in db
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }

  // create new user document in db
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check if user email exists in db
  const user = await User.findOne({ email });

  // return user obj if their password matches
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
      designation: user.designation,
      company: user.company,
      address: user.address,
      nationality: user.nationality,
      picture: user.picture,
      userToken: generateToken(user._id),
    });
    console.log({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
      designation: user.designation,
      company: user.company,
      address: user.address,
      nationality: user.nationality,
      userToken: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  // req.user was set in authMiddleware.js
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
      designation: user.designation,
      company: user.company,
      address: user.address,
      nationality: user.nationality,
      picture: user.picture,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  // req.user was set in authMiddleware.js
  const users = await User.find();

  if (users.length) {
    res.json(users);
  } else {
    res.status(404);
    throw new Error("No users found");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      firstName,
      lastName,
      email,
      role,
      phoneNumber,
      designation,
      company,
      address,
      nationality,
    } = req?.body;

    const picture = req?.file?.originalname;
    let user;
    if (picture) {
      user = await User.findByIdAndUpdate(userId, {
        picture,
      });
    } else {
      user = await User.findByIdAndUpdate(userId, {
        firstName,
        lastName,
        email,
        role,
        phoneNumber,
        designation,
        company,
        address,
        nationality,
      });
    }

    console.log("UPDATEEEEEEEEEEEEEEEEEE", user);
    if (user) {
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
        designation: user.designation,
        company: user.company,
        address: user.address,
        nationality: user.nationality,
        picture: user.picture,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error("Invalid user data");
  }
});

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
  updateUser,
};
