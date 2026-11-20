const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const Appointment = require('../models/Appointment');
const User = require('../models/User');

const normalizeDate = (dateStr) => {
  if (typeof dateStr === 'string') {
    const parts = /^(\d{4})-(\d{2})-(\d{2})/.exec(dateStr);
    if (!parts) return null;
    const year = Number(parts[1]);
    const month = Number(parts[2]);
    const day = Number(parts[3]);
    const parsed = new Date(year, month - 1, day);
    if (
      parsed.getFullYear() !== year ||
      parsed.getMonth() !== month - 1 ||
      parsed.getDate() !== day
    ) {
      return null;
    }
    return parsed;
  }
  const parsed = new Date(dateStr);
  if (Number.isNaN(parsed.getTime())) return null;
  parsed.setHours(0, 0, 0, 0);
  return parsed;
};

const createAppointment = asyncHandler(async (req, res) => {
  const { doctor, appointmentDate, appointmentTime, reason } = req.body;

  if (!doctor || !appointmentDate || !appointmentTime || !reason) {
    throw new ApiError(400, 'Doctor, date, time and reason are required');
  }

  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(appointmentTime)) {
    throw new ApiError(400, 'Invalid appointment time, use HH:mm format');
  }

  const doctorUser = await User.findOne({ _id: doctor, role: 'doctor', isActive: true });
  if (!doctorUser) {
    throw new ApiError(404, 'Doctor not found or inactive');
  }

  const date = normalizeDate(appointmentDate);
  if (!date) {
    throw new ApiError(400, 'Invalid appointment date');
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date < today) {
    throw new ApiError(400, 'Cannot book appointments in the past');
  }

  const existing = await Appointment.findOne({
    patient: req.user._id,
    doctor,
    appointmentDate: date,
    appointmentTime,
    status: { $in: ['pending', 'approved'] },
  });
  if (existing) {
    throw new ApiError(400, 'You already have an appointment with this doctor at this date and time');
  }

  const doctorSlotTaken = await Appointment.findOne({
    doctor,
    appointmentDate: date,
    appointmentTime,
    status: { $in: ['pending', 'approved'] },
  });
  if (doctorSlotTaken) {
    throw new ApiError(400, 'Doctor already has an appointment at this date and time');
  }

  const appointment = await Appointment.create({
    patient: req.user._id,
    doctor,
    appointmentDate: date,
    appointmentTime,
    reason,
  });

  const populated = await Appointment.findById(appointment._id)
    .populate('patient', 'name email')
    .populate('doctor', 'name email specialization experience');

  res.status(201).json({ success: true, appointment: populated });
});

const getMyAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ patient: req.user._id })
    .populate('doctor', 'name email specialization experience')
    .sort({ appointmentDate: -1, createdAt: -1 });
  res.json({ success: true, count: appointments.length, appointments });
});

const getDoctorAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ doctor: req.user._id })
    .populate('patient', 'name email')
    .sort({ appointmentDate: -1, createdAt: -1 });
  res.json({ success: true, count: appointments.length, appointments });
});

const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!['approved', 'rejected'].includes(status)) {
    throw new ApiError(400, 'Status must be approved or rejected');
  }

  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    throw new ApiError(404, 'Appointment not found');
  }

  if (appointment.doctor.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'You can only update your own appointments');
  }

  if (appointment.status !== 'pending') {
    throw new ApiError(400, 'Only pending appointments can be approved or rejected');
  }

  appointment.status = status;
  await appointment.save();

  const populated = await Appointment.findById(appointment._id)
    .populate('patient', 'name email')
    .populate('doctor', 'name email specialization experience');

  res.json({ success: true, appointment: populated });
});

const cancelAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    throw new ApiError(404, 'Appointment not found');
  }

  if (appointment.patient.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'You can only cancel your own appointments');
  }

  if (appointment.status !== 'pending') {
    throw new ApiError(400, 'Only pending appointments can be cancelled');
  }

  appointment.status = 'cancelled';
  await appointment.save();

  const populated = await Appointment.findById(appointment._id)
    .populate('doctor', 'name email specialization experience');

  res.json({ success: true, appointment: populated });
});

module.exports = {
  createAppointment,
  getMyAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  cancelAppointment,
};
