import 'dotenv/config';

function required (name) {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing required environment variable: ${name}`);
    process.exit(1);
  }
  return value;
}

export const MONGO_URI = required('MONGO_URI');
export const JWT_SECRET = required('JWT_SECRET');
export const PORT = process.env.PORT || '5000';
