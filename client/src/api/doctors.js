import api from './client';

export const getDoctors = (params = {}) => api.get('/doctors', { params }).then((res) => res.data);
export const getDoctorById = (id) => api.get(`/doctors/${id}`).then((res) => res.data);
