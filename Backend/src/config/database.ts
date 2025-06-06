import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/papergo';
let client: MongoClient | null = null;

export const connectToDatabase = async () => {
  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export const getDb = () => {
  if (!client) {
    throw new Error('Database not initialized. Call connectToDatabase() first.');
  }
  return client.db();
};

export const getPredictionsCollection = () => {
  return getDb().collection('predictions');
};

export default connectToDatabase; 