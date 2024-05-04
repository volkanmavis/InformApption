const Question = require('../models/questionModel');

const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json({ status: true, data: questions });
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ status: false, error: "Internal server error" });
    }
};

const createQuestion = async (req, res) => {
    try { 
        console.log('Request body:', req.body);
        const data = {
            category: req.body.category, 
            difficulty: req.body.difficulty, 
            question: req.body.question, 
            correctAnswer: req.body.correctAnswer,
            incorrectAnswers: req.body.incorrectAnswers
        };
        // Check if the question already exists
        const existingQuestion = await Question.findOne({ question: req.body.question });
        if (existingQuestion) {
            return res.status(400).json({ error: 'Question already exists' });
        } else {
            const newQuestion = await Question.create(data);
            res.status(201).send({ msg: "Question created successfully", status: true, newQuestion });
        }
        
    } catch (error) {
        console.error('Error creating question:', error);
        res.status(500).send({ msg: "Internal server error", status: false });
    }
};


const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedQuestion = await Question.findByIdAndDelete(id);
        if (!deletedQuestion) {
            return res.status(404).json({ status: false, error: "Question not found" });
        }
        res.status(200).json({ status: true, message: "Question deleted successfully" });
    } catch (error) {
        console.error('Error deleting question:', error);
        res.status(500).json({ status: false, error: "Internal server error" });
    }
};

const updateQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedQuestion = await Question.findByIdAndUpdate(id, data, { new: true });
        if (!updatedQuestion) {
            return res.status(404).json({ status: false, error: "Question not found" });
        }
        res.status(200).json({ status: true, message: "Question updated successfully", data: updatedQuestion });
    } catch (error) {
        console.error('Error updating question:', error);
        res.status(500).json({ status: false, error: "Internal server error" });
    }
};



module.exports = { getAllQuestions, createQuestion, deleteQuestion, updateQuestion };
