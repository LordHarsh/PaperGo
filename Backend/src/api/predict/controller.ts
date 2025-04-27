import * as fsp from "node:fs/promises";
import fs from "fs";
import path, { join } from "path";
import { sendMail } from "../../shared/services/sesService";
import ejs, { renderFile } from "ejs";

interface JsonData {
  [key: string]: string[][];
}

// Use relative path for development or absolute path for production
const getRecommendationsPath = () => {
  return process.env.NODE_ENV === "production" 
    ? path.join(process.cwd(), "build/shared/recommendations.json")
    : "./src/shared/recommendations.json";
};

const paperRecommendationsjson = fs.readFileSync(
  getRecommendationsPath(),
  "utf-8"
);
const paperRecommendations: JsonData = JSON.parse(paperRecommendationsjson);

const PredictPapers = async (interests: string[]) => {
  const filteredData: any = {};
  const randomData: {
    [key: string]: {
      [x: string]: string;
    };
  } = {};
  for (const key of interests) {
    if (paperRecommendations.hasOwnProperty(key)) {
      filteredData[key] = paperRecommendations[key];

      // Randomly select a title and ID from the filtered data
      const titles = filteredData[key][0];
      const ids = filteredData[key][1];
      const randomIndex = Math.floor(Math.random() * titles.length);
      const randomTitle = titles[randomIndex];
      const randomId = ids[randomIndex];

      randomData[key] = { title: randomTitle, id: randomId };
    }
  }
  return randomData;
};

const sendPaperToEmail = async (email: string, titles: Array<string>, randomData: any) => {
  try {
    // Use correct path resolution that works in both development and production
    const templatePath = process.env.NODE_ENV === "production"
      ? path.join(process.cwd(), "build/shared/templates/emailTemplate.ejs")
      : path.join(process.cwd(), "src/shared/templates/emailTemplate.ejs");
    
    console.log("Template path:", templatePath);
    
    const template = await fsp.readFile(templatePath, "utf8");
    try {
      // randomData = randomData.map((item: any) => ({
      //   title: item.title,
      //   id: item.id,
      //   link: `https://www.google.com/search?q=${encodeURIComponent(item.title)}`
      // }));
      for (const key in randomData) {
        randomData[key].link = `https://www.google.com/search?q=${encodeURIComponent(randomData[key].title)}`;
      }
      console.log("randomData:", randomData);
      const renderedHtml = ejs.render(template, { data: titles, randomData });
      await sendMail(
        [email],
        "Your Research Paper from PaperGo",
        renderedHtml!
      );
    } catch (error) {
      console.error("Template rendering error:", error);
      throw Error("Error in Generating Template");
    }
  } catch (error) {
    console.log("File read error:", error);
    throw Error(`Failed to read email template: ${error.message}`);
  }
};

export default PredictPapers;
export { sendPaperToEmail };
