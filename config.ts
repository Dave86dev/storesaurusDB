import dotenv from 'dotenv';
dotenv.config();

interface config {
  port: number;
  rounds: number;
  mongoUri: string;
  secretKey: string;
}

const config: config = {
  port: parseInt(process.env.PORT || '3000', 10),
  rounds: parseInt(process.env.ROUNDS),
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase',
  secretKey: process.env.JWT_SECRET || 'yoursecret',
};

if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is not set.');
  process.exit(1);
}

export default config;
