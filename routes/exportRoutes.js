const express = require('express');
const { exportTransactions } = require('../controllers/exportController');

const router = express.Router();

// Route to export transactions
router.get('/transactions/:userId', exportTransactions);

module.exports = router;