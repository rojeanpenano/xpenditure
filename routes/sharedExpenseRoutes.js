const express = require('express');
const { calculateSettlements } = require('../controllers/sharedExpenseController');

const router = express.Router();

// Route to calculate settlements
router.post('/settlements', calculateSettlements);

module.exports = router;