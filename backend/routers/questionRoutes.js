const express = require('express');

const router = express.Router();

const { 
    getAllQuestions,
    createQuestion,
    deleteQuestion,
    updateQuestion
} = require('../controllers/questionController');

router.get('/allquestions', getAllQuestions);
router.post('/create', createQuestion);
router.delete('/:id', deleteQuestion);
router.put('/:id', updateQuestion);

module.exports = router;
