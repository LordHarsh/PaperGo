import * as dotenv from 'dotenv';
import path from 'path';

// Determine the .env file path based on NODE_ENV
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';  // Or any other logic
const envPath = path.resolve(process.cwd(), envFile);

// Load the specific .env file
dotenv.config({ path: envPath });

process.env.NODE_ENV = process.env.NODE_ENV || "development";

export default {
	/**
	 * Port the app should run on
	 */
	port: parseInt(process.env.PORT!) || 5050,

	/**
	 * Used by Winston logger
	 */
	logs: {
		level: process.env.LOG_LEVEL || "silly",
	},

	awsConfig: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
		region: process.env.AWS_REGION!,
		sesSourceEmail: process.env.AWS_SES_SOURCE_EMAIL!,
		sesReplyToEmail: process.env.AWS_SES_REPLY_TO_EMAIL!,
		mailerSendApiKey: process.env.MAILER_SEND_API_KEY!,
	},

	/**
	 * API configs
	 */
	api: {
		prefix: "/api",
	},
};
