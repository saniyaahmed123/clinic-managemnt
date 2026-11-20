const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');
const Appointment = require('../models/Appointment');

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json({ success: true, count: users.length, users });
});

const createDoctor = asyncHandler(async (req, res) => {
  const { name, email, password, specialization, experience } = req.body;

  if (!name || !email || !password || !specialization) {
    throw new ApiError(400, 'Name, email, password and specialization are required');
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    throw new ApiError(400, 'User with this email already exists');
  }

  const doctor = await User.create({
    name,
    email,
    password,
    role: 'doctor',
    specialization,
    experience: experience !== undefined ? Number(experience) : undefined,
    isActive: true,
  });

  res.status(201).json({
    success: true,
    doctor: {
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      role: doctor.role,
      specialization: doctor.specialization,
      experience: doctor.experience,
      isActive: doctor.isActive,
    },
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  if (user.role === 'admin') {
    throw new ApiError(400, 'Cannot delete admin accounts');
  }

  await Appointment.deleteMany({ $or: [{ patient: user._id }, { doctor: user._id }] });
  await user.deleteOne();

  res.json({ success: true, message: 'User deleted successfully' });
});

const toggleUserStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  if (user.role === 'admin') {
    throw new ApiError(400, 'Cannot change status of admin accounts');
  }

  user.isActive = !user.isActive;
  await user.save();

  res.json({
    success: true,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    },
  });
});

const getAllAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find()
    .populate('patient', 'name email')
    .populate('doctor', 'name email specialization')
    .sort({ createdAt: -1 });
  res.json({ success: true, count: appointments.length, appointments });
});

const getStats = asyncHandler(async (req, res) => {
  const [totalPatients, totalDoctors, totalAppointments] = await Promise.all([
    User.countDocuments({ role: 'patient' }),
    User.countDocuments({ role: 'doctor' }),
    Appointment.countDocuments(),
  ]);

  res.json({
    success: true,
    stats: { totalPatients, totalDoctors, totalAppointments },
  });
});

module.exports = {
  getUsers,
  createDoctor,
  deleteUser,
  toggleUserStatus,
  getAllAppointments,
  getStats,
};
