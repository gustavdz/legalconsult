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
} from "../controllers/questionController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/all").get(getQuestions);
router.route("/").get(getFreeQuestions).post(protect, admin, createQuestion);
router.route("/:id/message").post(protect, createQuestionMessage);
router
  .route("/:id")
  .get(getQuestionById)
  .delete(protect, admin, deleteQuestion)
  .put(protect, admin, updateQuestion);

export default router;
