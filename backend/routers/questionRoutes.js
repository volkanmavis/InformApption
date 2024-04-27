const router = express.Router();

const { 
    getAllQuestions,
    createQuestion,
    deleteQuestion,
    updateQuestion,
} = require('../controllers/questionController');

router.get('/all', getAllQuestions);
router.post('/create', createQuestion);
router.delete('/:id', deleteQuestion);
router.put('/:id', updateQuestion);

module.exports = router;