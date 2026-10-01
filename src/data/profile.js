// Local data (no backend). Edit these values to change what the dashboard shows.
// avatarUrl: apni photo lagani ho to src/assets/avatar.png upload karo,
// phir upar `import avatar from '../assets/avatar.png';` jodo aur avatarUrl: avatar karo.
export const profile = { name: 'Shubham Kumar', email: 'kumarshubhaaaaam@gmail.com', merchantId: '3326558943', avatarUrl: '' };
export const stats = { totalRequests: 0, successful: 0, failedOrPending: 0, revenue: 0 };
export const transactions = []; // each: {orderId,bankRrn,customerRef,createdAt,amount,verificationStatus}
// Set to true to see the "configured" state of Payment Links / Dashboard.
export const imapConfigured = false;
export const paymentLinks = []; // {slug, amount, status:'pending'|'paid'|'expired'|'disabled', createdAt, expiresAt}
