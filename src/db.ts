import appConfig from "../config";
import { MongoClient, Db } from "mongodb";

const uri: string = appConfig.mongoUri;
const client = new MongoClient(uri);
let db: Db;

const connect = async (): Promise<void> => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db("FileStorage");

    await setupIndexes();
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

const setupIndexes = async () => {
  try {
    await db
      .collection("Analysis_Collection")
      .createIndex({ fileId: 1, userId: 1 }, { unique: false });
    console.log("Indexes for Analysis collection created successfully");
  } catch (error) {
    console.error("Error creating indexes:", error);
  }
};

export const getDb = (): Db => {
  if (!db) {
    throw new Error("Database connection still not established.");
  }
  return db;
};

export const initDbConnection = connect;
