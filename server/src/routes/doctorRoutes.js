const express = require('express');
const { getDoctors, getDoctorById } = require('../controllers/doctorController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getDoctors);
router.get('/:id', protect, getDoctorById);

module.exports = router;
