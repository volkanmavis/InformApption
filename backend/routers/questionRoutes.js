const router = express.Router();
const { verifyToken, restrict } = require('../middleware/auth');

const { 
    getAllQuestions,
    createQuestion,
    deleteQuestion,
    updateQuestion,
} = require('../controllers/questionController');

router.get('/all', verifyToken, restrict('admin'), getAllQuestions);
router.post('/create', verifyToken, restrict('admin'), createQuestion);
router.delete('/:id', verifyToken, restrict('admin'), deleteQuestion);
router.put('/:id', verifyToken, restrict('admin'), updateQuestion);

module.exports = router;