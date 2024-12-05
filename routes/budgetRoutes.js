const express = require('express');
const router = express.Router();
const { getBudgets, setBudget } = require('../controllers/budgetController');
const { protect } = require('../middleware/authMiddleware');

// Routes for budget management
router.route('/').get(protect, getBudgets).post(protect, setBudget);

module.exports = router;
