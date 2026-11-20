const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');

const getDoctors = asyncHandler(async (req, res) => {
  const { search, specialization } = req.query;
  const query = { role: 'doctor', isActive: true };

  if (specialization) {
    query.specialization = { $regex: specialization, $options: 'i' };
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { specialization: { $regex: search, $options: 'i' } },
    ];
  }

  const doctors = await User.find(query).select('name email specialization experience isActive');
  res.json({ success: true, count: doctors.length, doctors });
});

const getDoctorById = asyncHandler(async (req, res) => {
  const doctor = await User.findOne({ _id: req.params.id, role: 'doctor', isActive: true }).select(
    'name email specialization experience isActive'
  );
  if (!doctor) {
    throw new ApiError(404, 'Doctor not found');
  }
  res.json({ success: true, doctor });
});

module.exports = { getDoctors, getDoctorById };
