# Paper-Pilot - Get your research papers on Autopilot

## Important Links and Resources 📃 -

- [Use PaperGo](https://paper-go.vercel.app/)
- [Demo Video]()
- [Presentation](https://www.canva.com/design/DAFmdv2FO94/6omhOuxT2cRa-DJXr7Cqvw/edit?utm_content=DAFmdv2FO94&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

### AI based research-paper recommendation with E-mail services 📚🦾

PaperGo is an innovative research paper recommendation system that leverages artificial intelligence to provide personalized recommendations to researchers and scholars. With its powerful algorithms and integration of email services, PaperGo aims to streamline the process of discovering relevant research papers and keeping users updated with the latest findings in their field.

## Key features 🔍-

- Advanced Recommendation Algorithms: PaperGo employs a combination of TF-IDF and KNN-like algorithms to cluster research papers based on their content and similarity. This ensures accurate and tailored recommendations to suit each user's interests.

- Custom Dataset: PaperGo's dataset is meticulously curated by scraping research papers from the IEEE website. This guarantees a vast collection of high-quality academic papers across various domains.

- User-Friendly Front End: The front end of PaperGo is built using React, providing a seamless and intuitive user experience. The integration of Google Authentication ensures secure access to the platform. Web-app is completely responsive and can be used for any type of screen.

- AWS Simple Email Services: PaperGo leverages the power of AWS SES to deliver periodic research paper recommendations directly to users' email inboxes. This ensures that users stay informed about the latest developments in their field without any hassle.

- Express.js and Flask Integration: PaperGo is powered by Express.js on the backend, providing a robust and scalable infrastructure for efficient data processing and recommendation generation. Flask, a Python web framework, is also utilized to handle specific functionalities seamlessly.

## Screenshots of Web-app 💻-

![1](https://github.com/tanmayagrwl/PaperGo/assets/75358720/6ed32c3f-6374-4f35-94f8-f52b7d608f92)

![2](https://github.com/tanmayagrwl/PaperGo/assets/75358720/13f601c8-435b-4ca9-890c-810e479e5b76)

## Email service 📬

![WhatsApp Image 2023-06-23 at 16 45 01](https://github.com/tanmayagrwl/PaperGo/assets/75358720/68855f61-26d5-4f96-a8b6-efada009f76e)

## Scope of Improvements 🔬

- Increase dataset size by including papers from additional reputable sources.
- Add flexibility for users to customize email frequency from the dashboard.
- Explore advanced machine learning models like LSTMs and Transformers.
- Enhance user experience through improved UI/UX, search functionality, and customization options.
- Fine-tune recommendation algorithms based on user feedback and evaluation.
- Implement paper rating and feedback system for users.
- Introduce collaboration and social features like sharing papers and discussion forums.

## Deployment Links

`https://PaperGo-production.up.railway.app`

 *PS: use **/api** as prefix to endpoints*

## Installation 🔧

1. Client

   Install dependencies

   ```
   $ npm install
   ```

   Start the server

   ```
   $ npm run build
   $ npm run preview
   ```

2. Server

   Install Dependencies

   ```
   $ cd Backend
   $ yarn
   ```

   Start the server

   ```
   $ yarn build
   $ yarn start
   ```

## Project Setup ⚙️

If you've downloaded the project as a zip file, follow these steps to set it up on your local machine:

1. Extract the downloaded zip file to a folder of your choice.

2. Open a terminal or command prompt and navigate to the project directory.

3. **Client Setup:**

   - Change to the `client` directory:
     ```
     cd client
     ```

   - Install the client dependencies:
     ```
     npm install
     ```

   - Start the client server:
     ```
     npm run build
     npm run preview
     ```

4. **Server Setup:**

   - Change to the `Backend` directory:
     ```
     cd Backend
     ```

   - Install the server dependencies:
     ```
     yarn
     ```

   - Start the server:
     ```
     yarn build
     yarn start
     ```

5. Once both the client and server are running, you can access the Paper-Pilot web app by opening your browser and navigating to `http://localhost:3000`.

Please note that these instructions assume you have Node.js, npm, and yarn installed on your machine. If you don't have them installed, make sure to install them before following the above steps.

Additionally, ensure that all the dependencies are successfully installed and there are no errors during the setup process.

That's it! You should now have the Paper-Pilot project up and running locally on your machine.

Feel free to modify the instructions as per your project structure or any specific requirements.

## License and Contribution Guidelines 📜

 <div align="left">
 <p>
 <br>
   <img src="https://img.shields.io/badge/License-MIT-yellow.svg?logo=Microsoft%20Word&style=for-the-badge" height="28"/><br>
   <br><strong>PaperGo</strong> is under MIT License, Please Read the <strong>LICENSE</strong>
  <p>
 </div>
 We value keeping this site open source, but as you all know, plagiarism is bad. We spent a non-negligible amount of effort developing, designing, and trying to perfect this iteration of our website, and we are proud of it! All we ask is to not claim this effort as your own.

So, feel free to fork this repo. If you do, please just give us proper credit.Refer to this handy file <strong>Contributing.md</strong> if you're not sure what to do we would. Thanks!