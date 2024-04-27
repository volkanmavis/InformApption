const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  category: { type: String, required: true },
  difficulty: { type: String, required: true },
  question: { type: String, required: true },
  correct_answer:{ type: String, required: true },
  incorrect_answers: { type: String, required: true },
  userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
});

const QuestionModel = mongoose.model("Question", QuestionSchema);

module.exports = QuestionModel