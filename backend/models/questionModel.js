const mongoose = require("mongoose");

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
    takenBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    takenAt: { type: Date },
    paidAt: { type: Date },
    closedAt: { type: Date },
    status: {
      status: {
        type: String,
        required: true,
        enum: [
          "No Gestionado",
          "Cotización",
          "Negociación",
          "Abonado",
          "Arranque de Proceso",
          "En Proceso",
          "Caso Cerrado Ganado",
          "Caso Cerrado Perdido",
          "Cliente Desistió",
        ],
      },
      type: {
        type: String,
        required: true,
        enum: ["Abierto", "Cerrado", "En Espera"],
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Question", questionSchema);
