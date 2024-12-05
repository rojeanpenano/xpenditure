const express = require('express');
const router = express.Router();
const { getBudgets, setBudget } = require('../controllers/budgetController');
const { protect } = require('../middleware/authMiddleware');

// Define routes for fetching and creating budgets
router.route('/')
    .get(protect, getBudgets)   // Get all budgets for a user
    .post(protect, setBudget); // Add a new budget

module.exports = router;
