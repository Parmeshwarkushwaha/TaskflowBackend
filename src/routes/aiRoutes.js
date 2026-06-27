const express = require('express');
const aiController = require('../controllers/aiController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authenticate);
router.post('/suggest', aiController.suggest);

module.exports = router;
