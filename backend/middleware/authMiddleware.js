const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

const lawyer = (req, res, next) => {
  if (req.user && req.user.isLawyer) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as a lawyer");
  }
};

const adminLawyer = (req, res, next) => {
  if (req.user && (req.user.isAdmin || req.user.isLawyer)) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

const customer = (req, res, next) => {
  if (req.user && req.user.isCustomer) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as a customer");
  }
};

exports.protect = protect;
exports.admin = admin;
exports.lawyer = lawyer;
exports.customer = customer;
exports.adminLawyer = adminLawyer;
