import { Document } from 'mongodb';

// Interface for Prediction document
export interface IPrediction {
  email: string;
  interests: string[];
  recommendedPapers: {
    [key: string]: {
      title: string;
      id: string;
    };
  };
  timestamp: Date;
}

// Factory function to create a prediction document
export const createPrediction = (
  email: string,
  interests: string[],
  recommendedPapers: {
    [key: string]: {
      title: string;
      id: string;
    };
  }
): IPrediction => {
  return {
    email,
    interests,
    recommendedPapers,
    timestamp: new Date(),
  };
};

export default createPrediction; 