import express from "express";
const router = express.Router();
import {
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
} from "../controllers/questionController.js";
import {
  protect,
  admin,
  adminLawyer,
  customer,
} from "../middleware/authMiddleware.js";

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

export default router;
