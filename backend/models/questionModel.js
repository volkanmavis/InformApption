const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  category: { type: String, required: true },
  difficulty: { type: String, required: true },
  question: { type: String, required: true },
  answer:{ type: String, required: true },
  incorrectAnswers: [{ type: String, required: true }],
});

const QuestionModel = mongoose.model("Question", questionSchema);

module.exports = QuestionModel;