import { request } from './api';
export const getDashboard = (days = 7) => request(`/dashboard?days=${days}`);
