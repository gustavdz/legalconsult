import { response } from "express";
import asyncHandler from "express-async-handler";
import Question from "../models/questionModel.js";
import User from "../models/userModel.js";

// @desc    Fetch all not taken questions
// @route   GET /api/questions
// @access  Public
const getFreeQuestions = asyncHandler(async (req, res) => {
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i", //case insensitve
        },
      }
    : {};
  const count = await Question.countDocuments({ ...keyword, isTaken: false });
  let questions = {};
  if (count === 0) {
    questions = await Question.find({
      detail: { $regex: req.query.keyword, $options: "i" },
      isTaken: false,
    })
      .populate("user")
      .limit(pageSize)
      .skip(pageSize * (page - 1));
  } else {
    questions = await Question.find({ ...keyword, isTaken: false })
      .populate("user")
      .limit(pageSize)
      .skip(pageSize * (page - 1));
  }

  res.json({
    page,
    pages: Math.ceil(count / pageSize),
    questions,
  });
});

// @desc    Fetch all questions
// @route   GET /api/questions/all
// @access  Public
const getQuestions = asyncHandler(async (req, res) => {
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i", //case insensitve
        },
      }
    : {};
  const count = await Question.countDocuments({ ...keyword });
  const questions = await Question.find({ ...keyword })
    .populate("user")
    .populate("takenBy", ["-password", "-isAdmin", "-isCustomer"])
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({
    page,
    pages: Math.ceil(count / pageSize),
    questions,
  });
});

// @desc    Fetch single question
// @route   GET /api/questions/:id
// @access  Public
const getQuestionById = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id)
    .populate("user", "-password")
    .populate("messages.user", "-password")
    .populate("takenBy", ["-password", "-isAdmin", "-isCustomer"]);

  if (question) {
    res.json(question);
  } else {
    res.status(404);
    throw new Error("Question not found");
  }
});

// @desc    Delete single question
// @route   DELETE /api/questions/:id
// @access  Private/Admin
const deleteQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);
  if (question) {
    await question.remove();
    res.json({ message: "Question removed" });
  } else {
    res.status(404);
    throw new Error("Question not found");
  }
});

// @desc    Create a question
// @route   POST /api/questions
// @access  Private/Admin
const createQuestion = asyncHandler(async (req, res) => {
  const question = new Question({
    title: "sample name",
    detail: "description placeholder",
    user: req.user._id,
  });
  const createdQuestion = await question.save();
  res.status(201).json(createdQuestion);
});

// @desc    Update a question
// @route   PUT /api/questions/:id
// @access  Private/Admin
const updateQuestion = asyncHandler(async (req, res) => {
  const { title, detail, areas, isTaken, isPaid, isClosed } = req.body;

  const question = await Question.findById(req.params.id);

  if (question) {
    question.title = title;
    question.detail = detail;
    question.areas = areas;
    question.isTaken = isTaken;
    question.isPaid = isPaid;
    question.isClosed = isClosed;

    const updatedQuestion = await question.save();
    res.status(201).json(updatedQuestion);
  } else {
    res.status(404);
    throw new Error("Question not found");
  }
});

// @desc    Create new message
// @route   POST /api/questions/:id/message
// @access  Private
const createQuestionMessage = asyncHandler(async (req, res) => {
  const { message } = req.body;

  const question = await Question.findById(req.params.id);

  if (question) {
    const msg = {
      message: message,
      user: req.user._id,
    };
    question.messages.push(msg);
    question.numMessages = question.messages.length;

    await question.save();
    res.status(201).json({ message: "Message added" });
  } else {
    res.status(404);
    throw new Error("Question not found");
  }
});

// @desc    Take a question
// @route   POST /api/questions/:id/take
// @access  Private/Admin/Lawyer
const takeQuestion = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const question = await Question.findById(req.params.id);

  if (question) {
    question.isTaken = true;
    question.takenBy = userId;

    await question.save();
    res.status(201).json({ message: "Question taken" });
  } else {
    res.status(404);
    throw new Error("Question not found");
  }
});

export {
  getQuestionById,
  getQuestions,
  deleteQuestion,
  createQuestion,
  updateQuestion,
  createQuestionMessage,
  getFreeQuestions,
  takeQuestion,
};
