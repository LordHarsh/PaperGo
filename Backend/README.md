# PaperGo Backend

This is the backend server for the PaperGo application, providing API endpoints for paper recommendations and email services.

## Requirements

- Node.js
- MongoDB

## Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

2. Configure MongoDB:
   - Install MongoDB on your system or use a MongoDB cloud service
   - Create a `.env` file in the Backend directory with the following content:
   ```
   # Server Configuration
   PORT=3000
   
   # MongoDB Connection
   MONGODB_URI=mongodb://localhost:27017/papergo
   
   # Add other existing environment variables here
   ```

3. Build and start the server:
   ```bash
   yarn build
   yarn start
   ```
   
   For development:
   ```bash
   yarn dev
   ```

## Features

- Paper recommendation API
- Email service integration with AWS SES
- MongoDB logging for prediction requests using native MongoDB driver

## MongoDB Collections

The backend uses the following MongoDB collections:

### predictions

This collection stores all prediction requests with the following schema:

```typescript
{
  email: string,           // User's email address
  interests: string[],     // Array of user interests
  recommendedPapers: {     // Object containing recommended papers
    [interest]: {
      title: string,
      id: string
    }
  },
  timestamp: Date          // When the prediction was made
}
```

## API Endpoints

- `POST /api/predict`: Get paper recommendations based on interests
- `GET /api/predict/preview-template`: Preview the email template

For more information, refer to the main [PaperGo documentation](../README.md). 