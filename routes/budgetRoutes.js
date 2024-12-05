const express = require('express');
const router = express.Router();
const { getBudgets, setBudget } = require('../controllers/budgetController'); // Import controllers
const { protect } = require('../middleware/authMiddleware'); // Import middleware

// Define routes
router.route('/')
    .get(protect, getBudgets) // GET route for fetching budgets
    .post(protect, setBudget); // POST route for adding a budget

module.exports = router; // Export the router
