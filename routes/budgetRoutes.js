const express = require('express');
const { setBudget, getBudget, optimizeBudget } = require('../controllers/budgetController');

const router = express.Router();

// Route to set or update a budget
router.post('/', setBudget);

// Route to get a user's budget
router.get('/:userId', getBudget);

// Route to optimize a budget
router.post('/optimize', optimizeBudget);

module.exports = router;
