const express = require('express');
const router = express.Router();
const { getSharedExpenses, addSharedExpense } = require('../controllers/sharedExpenseController');
const { protect } = require('../middleware/authMiddleware'); // Middleware for authentication

// GET and POST routes for shared expenses
router
    .route('/')
    .get(protect, getSharedExpenses) // Get all shared expenses
    .post(protect, addSharedExpense); // Add a new shared expense

module.exports = router;
