// TEMPORARY mock backend for UI testing. Loaded only when VITE_USE_MOCK_AUTH=true.
// Delete this file (and the USE_MOCK_AUTH branches in auth.js) once the real API is live.
//
// Test scenarios
//   Login    demo@famgateway.test / Demo@123   -> success
//            any other credentials              -> 401 invalid email or password
//            error@famgateway.test              -> 500 server error
//            slow@famgateway.test               -> timeout
//   Register taken@famgateway.test              -> 409 email already exists
//            error@famgateway.test              -> 500 server error
//            slow@famgateway.test               -> timeout
//            anything else                      -> success (account usable for login until page reload)
import { ApiError } from './api';

const DELAY = 800;
const SESSION_KEY = 'fg_mock_session'; // dev-only; holds the mock user, never a credential
const wait = (ms = DELAY) => new Promise((r) => setTimeout(r, ms));
const norm = (e) => String(e || '').trim().toLowerCase();

const users = new Map([
  ['demo@famgateway.test', { password: 'Demo@123', user: { name: 'Demo Merchant', email: 'demo@famgateway.test', phone: '9876543210', merchantId: '1000000001' } }],
]);

async function simulateFailures(email) {
  if (email === 'slow@famgateway.test') { await wait(1200); throw new ApiError('timeout'); }
  if (email === 'error@famgateway.test') throw new ApiError('server', 500);
}

export async function login(email, password) {
  await wait();
  const key = norm(email);
  await simulateFailures(key);
  const rec = users.get(key);
  if (!rec || rec.password !== password) throw new ApiError('unauthorized', 401);
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(rec.user));
  return { user: rec.user };
}

export async function register({ name, email, phone, password }) {
  await wait();
  const key = norm(email);
  await simulateFailures(key);
  if (key === 'taken@famgateway.test' || users.has(key)) throw new ApiError('server', 409);
  const user = { name: name.trim(), email: key, phone, merchantId: String(Math.floor(1e9 + Math.random() * 9e9)) };
  users.set(key, { password, user });
  return { user };
}

export async function logout() {
  await wait(200);
  sessionStorage.removeItem(SESSION_KEY);
  return { ok: true };
}

export async function getSession() {
  await wait(150);
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) throw new ApiError('unauthorized', 401);
  return { user: JSON.parse(raw) };
}
