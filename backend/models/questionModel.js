import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    message: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const questionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    areas: [
      {
        type: [String],
        required: false,
        enum: [
          "Administrativo",
          "Civil",
          "Familia",
          "Laboral",
          "Penal",
          "Societario",
          "Tránsito",
          "Tributario",
          "Otros",
        ],
      },
    ],
    messages: [messageSchema],
    numMessages: {
      type: Number,
      required: true,
      default: 0,
    },
    isTaken: {
      type: Boolean,
      required: true,
      default: false,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    isClosed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;
