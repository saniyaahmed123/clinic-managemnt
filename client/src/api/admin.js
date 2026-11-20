import api from './client';

export const getUsers = () => api.get('/admin/users').then((res) => res.data);
export const createDoctor = (payload) => api.post('/admin/doctors', payload).then((res) => res.data);
export const deleteUser = (id) => api.delete(`/admin/users/${id}`).then((res) => res.data);
export const toggleUserStatus = (id) => api.patch(`/admin/users/${id}/status`).then((res) => res.data);
export const getAllAppointments = () => api.get('/admin/appointments').then((res) => res.data);
export const getStats = () => api.get('/admin/stats').then((res) => res.data);
