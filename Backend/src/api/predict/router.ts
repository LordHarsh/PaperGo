import { Request, Response, Router } from "express";
import PredictPapers, { sendPaperToEmail } from "./controller";
import path from 'path';
import fs from 'fs';
import ejs from 'ejs';

const predictRouter = Router();

const handlePredict = async (req: Request, res: Response) => {
	const randomData = await PredictPapers(req.body.interests);

	//store keys of randomData in an array
	const keys = Object.keys(randomData);
	console.log("keys", keys);
	await sendPaperToEmail(req.body.email, keys, randomData);
	res.status(200).json({ success: true, data: randomData });
};

// New endpoint to preview the email template
predictRouter.get("/preview-template", async (req: Request, res: Response) => {
	try {
		// Sample data for preview
		const sampleData = ["Robotics", "Mathematics"];
		const sampleRandomData = {
			"Robotics": {
				title: "A Scalable Approach to Tomography-based Internet Measurement System",
				id: "4baa3f77-a7e3-4952-81c9-68872252df3a"
			},
			"Mathematics": {
				title: "Cooperative Conceptual Retrieval for Heterogeneous Information",
				id: "4b9585fe-1ccf-4dae-8d3b-b83f7d6f84fb"
			}
		};

		// Get template path
		const templatePath = process.env.NODE_ENV === "production"
			? path.join(process.cwd(), "build/shared/templates/emailTemplate.ejs")
			: path.join(process.cwd(), "src/shared/templates/emailTemplate.ejs");

		// Read and render the template
		const template = fs.readFileSync(templatePath, 'utf8');
		const renderedHtml = ejs.render(template, { 
			data: sampleData, 
			randomData: sampleRandomData 
		});

		res.send(renderedHtml);
	} catch (error) {
		console.error("Template preview error:", error);
		res.status(500).send(`Error previewing template: ${error.message}`);
	}
});

predictRouter.post("/", handlePredict);
export default predictRouter;
