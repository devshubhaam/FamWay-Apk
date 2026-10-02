import mongoose from 'mongoose';
import { env } from './env.js';
import { User } from '../models/User.js';
import { Session } from '../models/Session.js';
import { VerificationToken } from '../models/VerificationToken.js';
import { PasskeyCredential } from '../models/PasskeyCredential.js';
import { AuthChallenge } from '../models/AuthChallenge.js';

export async function connectDb() {
  mongoose.set('strictQuery', true);
  await mongoose.connect(env.mongoUri, { serverSelectionTimeoutMS: 15000 });
  // Build the unique / TTL indexes before accepting traffic.
  await Promise.all([User, Session, VerificationToken, PasskeyCredential, AuthChallenge].map((m) => m.init()));
}
export const disconnectDb = () => mongoose.disconnect();
