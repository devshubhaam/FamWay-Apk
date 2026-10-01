import { request } from './api';
// Status values come ONLY from the backend: verified | pending | failed | verification_failed
export const getRecentTransactions = (limit = 10) => request(`/transactions?limit=${limit}`);
