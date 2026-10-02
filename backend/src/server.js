import { env, assertEnv } from './config/env.js';
import { connectDb, disconnectDb } from './config/db.js';
import { createApp } from './app.js';

assertEnv();
await connectDb();
const server = createApp().listen(env.port, '0.0.0.0', () => console.log(`API listening on :${env.port}`));

const stop = async () => { server.close(); await disconnectDb(); process.exit(0); };
process.on('SIGTERM', stop); process.on('SIGINT', stop);
