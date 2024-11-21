const express = require('express');
const {
    setBudget,
    viewBudget,
    optimizeBudget,
} = require('../controllers/budgetController');
const router = express.Router();

// Route to set a budget
router.post('/', setBudget);

// Route to view budget details
router.get('/:userId', viewBudget);

// Route to optimize budget usage
router.post('/optimize', optimizeBudget);

module.exports = router;
