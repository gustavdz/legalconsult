const express = require("express");
const router = express.Router();
const {
  getQuestionById,
  getQuestions,
  deleteQuestion,
  updateQuestion,
  createQuestion,
  createQuestionMessage,
  getFreeQuestions,
  takeQuestion,
  getQuestionsByUserId,
  createPublicQuestion,
  getQuestionsCreatedUserId,
} = require("../controllers/questionController");
const {
  protect,
  admin,
  adminLawyer,
  customer,
} = require("../middleware/authMiddleware");

router.route("/all").get(getQuestions);
router.route("/").get(getFreeQuestions).post(protect, admin, createQuestion);
router.route("/public").post(createPublicQuestion);
router.route("/:id/message").post(protect, createQuestionMessage);
router.route("/:id/take").patch(protect, adminLawyer, takeQuestion);
router
  .route("/:id")
  .get(getQuestionById)
  .delete(protect, admin, deleteQuestion)
  .put(protect, admin, updateQuestion);

router.route("/user/:userid").get(protect, getQuestionsByUserId);
router
  .route("/createdby/:userid")
  .get(protect, customer, getQuestionsCreatedUserId);

module.exports = router;
