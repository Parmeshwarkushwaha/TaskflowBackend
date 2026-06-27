const express = require('express');
const boardController = require('../controllers/boardController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authenticate);
router.get('/', boardController.getBoards);
router.post('/', boardController.createBoard);
router.put('/:id', boardController.updateBoard);
router.delete('/:id', boardController.deleteBoard);

module.exports = router;
