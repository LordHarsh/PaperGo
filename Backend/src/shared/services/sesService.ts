import LoggerInstance from "../../loaders/logger";
import config from "../../config";
import { MailerSend, EmailParams, Recipient, Sender } from 'mailersend';
import { SESClient, SendEmailCommand, SendEmailCommandInput } from "@aws-sdk/client-ses";

// Create SES client instance if AWS credentials are available
const createSESClient = () => {
  try {
    return new SESClient(config.awsConfig);
  } catch (error) {
    console.warn("AWS SES initialization failed, will use console for email output");
    return null;
  }
};

const apiKey = config.awsConfig.mailerSendApiKey;
const emailService = new MailerSend({ apiKey });

const SESClientInstance = createSESClient();

export const sendMail = async (
  email: Array<string>,
  subject: string,
  body: string
) => {
  // For local development or when SES is not configured
  if (!SESClientInstance || !config.awsConfig.accessKeyId || !config.awsConfig.secretAccessKey) {
    console.log("----------------------------------------");
    console.log("EMAIL WOULD BE SENT (Development Mode):");
    console.log(`To: ${email.join(", ")}`);
    console.log(`Subject: ${subject}`);
    console.log("Body: [HTML Content]");
    console.log("----------------------------------------");
    console.log(config.awsConfig.sesSourceEmail);
    console.log(config.awsConfig.sesReplyToEmail);
    console.log(config.awsConfig.accessKeyId);
    console.log(config.awsConfig.secretAccessKey);
    console.log(config.awsConfig.region);
  }
  const params: SendEmailCommandInput = {
    Destination: {
      ToAddresses: [...email],
    },
    Message: {
      Body: {
        Html: {
          Data: body,
          Charset: "UTF-8",
        },
        Text: {
          Data: "Please use an HTML client to view this email.",
          Charset: "UTF-8",
        },
      },
      Subject: {
        Data: subject,
        Charset: "UTF-8",
      },
    },
    Source: config.awsConfig.sesSourceEmail  || "example@example.com", // Replace with your verified sender email
    ReplyToAddresses: [
      config.awsConfig.sesReplyToEmail || "example@example.com", // Replace with your verified reply-to email
    ],
  };
  const recipients = email.map(e => ({ email: e }));

  try {
    console.log("Sending email using AWS SES...");
    
    const sender = new Sender(config.awsConfig.sesSourceEmail, config.awsConfig.sesSourceEmail);
    const recipients = email.map(e => new Recipient(e, e));
    
    const emailParams = new EmailParams()
      .setFrom(sender)
      .setTo(recipients)
      .setSubject(subject)
      .setHtml(body);
    
    const response = await emailService.email.send(emailParams);
    console.log("Email sent successfully", response.body);
  } catch (error: any) {
    console.error("AWS SES error:", error);
    LoggerInstance.error("AWS SES error:", error); // Log the detailed error
    throw new Error(`Failed to send email: ${error.message}`); // Throw a more informative error
  }
};