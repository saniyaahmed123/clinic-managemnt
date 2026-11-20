import api from './client';

export const createAppointment = (payload) => api.post('/appointments', payload).then((res) => res.data);
export const getMyAppointments = () => api.get('/appointments/my').then((res) => res.data);
export const getDoctorAppointments = () => api.get('/appointments/doctor').then((res) => res.data);
export const updateAppointmentStatus = (id, status) =>
  api.patch(`/appointments/${id}/status`, { status }).then((res) => res.data);
export const cancelAppointment = (id) => api.patch(`/appointments/${id}/cancel`).then((res) => res.data);
