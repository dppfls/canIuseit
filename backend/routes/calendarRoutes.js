const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');

router.post('/calendar', calendarController.calendar);

module.exports = router;
