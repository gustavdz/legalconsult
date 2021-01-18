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
} from "../controllers/questionController.js";
import { protect, admin, lawyer } from "../middleware/authMiddleware.js";

router.route("/all").get(getQuestions);
router.route("/").get(getFreeQuestions).post(protect, admin, createQuestion);
router.route("/:id/message").post(protect, createQuestionMessage);
router.route("/:id/take").patch(protect, admin, lawyer, takeQuestion);
router
  .route("/:id")
  .get(getQuestionById)
  .delete(protect, admin, deleteQuestion)
  .put(protect, admin, updateQuestion);

export default router;
