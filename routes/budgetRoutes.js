const express = require('express');
const {
    setBudget, // Controller function to create or update a budget
    viewBudget, // Controller function to view a user's budget
    optimizeBudget, // Controller function to optimize budget usage
} = require('../controllers/budgetController');

const router = express.Router();

// Define routes for budgets
router.post('/', setBudget); // Route to create or update a budget
router.get('/:userId', viewBudget); // Route to retrieve a budget by userId
router.post('/optimize', optimizeBudget); // Route to optimize budget usage

module.exports = router;
