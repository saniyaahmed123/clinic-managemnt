const express = require('express');
const {
  getUsers,
  createDoctor,
  deleteUser,
  toggleUserStatus,
  getAllAppointments,
  getStats,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(protect, authorize('admin'));

router.get('/users', getUsers);
router.post('/doctors', createDoctor);
router.delete('/users/:id', deleteUser);
router.patch('/users/:id/status', toggleUserStatus);
router.get('/appointments', getAllAppointments);
router.get('/stats', getStats);

module.exports = router;
