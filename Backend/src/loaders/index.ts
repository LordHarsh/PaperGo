import express from "./express";
import Logger from "./logger";
import Express from "express";
import connectToDatabase from "../config/database";

export default async ({
  expressApp,
}: {
  expressApp: Express.Application;
}): Promise<void> => {
  // Connect to MongoDB
  await connectToDatabase();
  Logger.info("✌️ MongoDB connected");
  
  await express({ app: expressApp });
  Logger.info("✌️ Express loaded");

  Logger.info("✅ All modules loaded!");
};
