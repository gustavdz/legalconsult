const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const User = require("../models/userModel");
const Question = require("../models/questionModel");

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isLawyer: user.isLawyer,
      isCustomer: user.isCustomer,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const userExist = await User.findOne({ email });
  let isLawyer = false;
  let isCustomer = false;
  let isAdmin = true;

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }
  if (role === "Customer") {
    isLawyer = false;
    isCustomer = true;
    isAdmin = false;
  } else {
    isLawyer = true;
    isCustomer = false;
    isAdmin = false;
  }
  const user = await User.create({
    name,
    email,
    password,
    isLawyer,
    isCustomer,
    isAdmin,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isLawyer: user.isLawyer,
      isCustomer: user.isCustomer,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isLawyer: user.isLawyer,
      isCustomer: user.isCustomer,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password || user.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isLawyer: updatedUser.isLawyer,
      isCustomer: updatedUser.isCustomer,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");

  res.json(users);
});

// @desc    get my customers
// @route   GET /api/users/customers
// @access  Private/AdminLawyer
const getCustomers = asyncHandler(async (req, res) => {
  const users = await Question.find(
    {
      takenBy: req.user._id,
    },
    { user: 1, _id: 0 }
  ).populate("user", ["-password"]);

  const usersFiltered = users
    .map((user) => user.user)
    .filter(
      (user, index, self) => self.findIndex((u) => u._id === user._id) === index
    );
  const userQuestionsCount = await Promise.all(
    usersFiltered.map(async (user) => {
      const myCount = await Question.countDocuments({ user: user._id });
      user.questionCount = myCount;
      return user;
    })
  );
  res.json(userQuestionsCount);
});

// @desc    delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    get user  by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    user.isLawyer = req.body.isLawyer;
    user.isCustomer = req.body.isCustomer;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isLawyer: updatedUser.isLawyer,
      isCustomer: updatedUser.isCustomer,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

exports.authUser = authUser;
exports.registerUser = registerUser;
exports.getUserProfile = getUserProfile;
exports.updateUserProfile = updateUserProfile;
exports.getUsers = getUsers;
exports.deleteUser = deleteUser;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.getCustomers = getCustomers;
