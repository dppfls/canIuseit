const express = require('express');
const router = express.Router();
const { calculateExpirationDate } = require('../controllers/expirationController');

router.post('/calculate-expiration', calculateExpirationDate);

module.exports = router;
