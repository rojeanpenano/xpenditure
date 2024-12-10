const express = require('express');
const { getBudgets, setBudget, getRemainingBudget } = require('../controllers/budgetController');
const protect = require('../middleware/authMiddleware'); // Import protect middleware

const router = express.Router();

// Debug all imported functions and middleware
console.log({ getBudgets, setBudget, getRemainingBudget });
console.log('Protect middleware:', typeof protect);

// Budget routes
router.route('/').get(protect, getBudgets).post(protect, setBudget);
router.route('/:id/remaining').get(protect, getRemainingBudget);

module.exports = router;
