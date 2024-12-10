const express = require('express');
const { getSharedExpenses, addSharedExpense } = require('../controllers/sharedExpenseController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Define routes
router.route('/')
    .get(protect, getSharedExpenses) // Fetch shared expenses
    .post(protect, addSharedExpense); // Add a shared expense

module.exports = router;
