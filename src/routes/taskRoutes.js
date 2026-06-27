const express = require('express');
const taskController = require('../controllers/taskController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authenticate);
router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.patch('/:id/status', taskController.updateTaskStatus);

module.exports = router;
