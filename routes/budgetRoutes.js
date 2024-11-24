const express = require('express');
const { setBudget, viewBudget, optimizeBudget } = require('../controllers/budgetController');

const router = express.Router();

// Set or update a budget
router.post('/', setBudget);

// Get a user's budget
router.get('/:userId', viewBudget);

// Optimize budget
router.post('/optimize', optimizeBudget);

module.exports = router;
