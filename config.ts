import dotenv from 'dotenv';
dotenv.config();

interface config {
  apiMailjet: string;
  secretMailjet: string;
  mongoUri: string;
  port: number;
  rounds: number;
  secretKey: string;
}

const appConfig: config = {
  apiMailjet: process.env.API_KEY_MAILJET || 'your mailjet api key',
  secretMailjet: process.env.SECRET_KEY_MAILJET || 'your mailjet secret key',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase',
  port: parseInt(process.env.PORT || '3000', 10),
  rounds: parseInt(process.env.ROUNDS || '10', 10),
  secretKey: process.env.JWT_SECRET || 'yoursecret',
};

if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is not set.');
  process.exit(1);
}

export default appConfig;
