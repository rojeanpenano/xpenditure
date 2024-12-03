const express = require('express');
const router = express.Router();
const { setBudget, getBudgetSummary } = require('../controllers/budgetController');
const { protect } = require('../middleware/authMiddleware');

// Route to set a new budget
router.post('/', protect, setBudget);

// Route to get budget summary
router.get('/', protect, getBudgetSummary);

module.exports = router;
