const Question = require('../models/questionModel');

const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).send(questions);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).send({ msg: "Internal server error", status: false });
    }
};

const createQuestion = async (req, res) => {
    try { 
        const data = {
            category: req.body.category, 
            difficulty: req.body.difficulty, 
            question: req.body.question, 
            correct_answer: req.body.correct_answer,
            incorrect_answers: req.body.incorrect_answers
        };
        const newQuestion = await Question.create(data);
        res.status(201).send({ msg: "Question created successfully", status: true, newQuestion }); // Changed status to 201 for "Created" status
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).send({ msg: "Internal server error", status: false });
    }
};

const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params
        await Question.deleteOne({_id: id})
        res.status(200).send({msg: "deleted successfully", status: true});
    } catch (error) {
        console.error('Error deleting question:', error);
        res.status(500).send({ msg: "Internal server error", status: false });
    }
};

const updateQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        let updated = await Question.updateOne({_id: id}, data)
        res.status(200).send({ msg: "updated successfully", status: true, updated });
    } catch (error) {
        console.error('Error updating question:', error);
        res.status(500).send({ msg: "Internal server error", status: false });
    }
};

module.exports = { getAllQuestions, createQuestion, deleteQuestion, updateQuestion };