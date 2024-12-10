const express = require('express');
const { getSharedExpenses, addSharedExpense } = require('../controllers/sharedExpenseController'); // Ensure these are correctly imported
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Define routes
router.route('/')
    .get(protect, getSharedExpenses) // Ensure these functions are defined
    .post(protect, addSharedExpense);

module.exports = router;
