export const NAV_ITEMS = {
  patient: [
    { to: '/patient', label: 'Dashboard', icon: 'LayoutDashboard', end: true },
    { to: '/patient/doctors', label: 'Find Doctors', icon: 'Stethoscope' },
    { to: '/patient/book', label: 'Book Appointment', icon: 'CalendarPlus' },
    { to: '/patient/appointments', label: 'My Appointments', icon: 'CalendarDays' },
  ],
  doctor: [
    { to: '/doctor', label: 'Dashboard', icon: 'LayoutDashboard', end: true },
    { to: '/doctor/appointments', label: 'Appointment Requests', icon: 'ClipboardList' },
  ],
  admin: [
    { to: '/admin', label: 'Dashboard', icon: 'LayoutDashboard', end: true },
    { to: '/admin/users', label: 'Manage Users', icon: 'Users' },
    { to: '/admin/appointments', label: 'All Appointments', icon: 'CalendarDays' },
  ],
};

export const ROLE_LABELS = {
  patient: 'Patient',
  doctor: 'Doctor',
  admin: 'Administrator',
};
