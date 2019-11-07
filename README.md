CMPE 195 Poject
CMPE 195 Project

CONTENTS
Project Structure
Application Stack
Development Environment Requirements
Starting Node Server
Deploying Application Online (to Heroku)
1. Project Structure
The project is organized as such:

bin/
middlewares/
models/
node_modules/
public/
routes/
tests/
views/
bin/ -- Express startup scripts
middlewares/ -- Express middlewares which processes incoming requests before handing them down to the routes - BACKEND
models/ -- Models represent data, business logic, and handles storage - BACKEND
node_modules/ -- Contains Node.js modules
public/ -- Contains static files (e.g. CSS, images, javascript)
routes/ -- Defines application routes - BACKEND
tests/ -- Tests application
views/ -- Contains templates which are rendered and served by your routes - FRONTEND
2. Application Stack
Frontend
Standard HTML, CSS, JS
Bootstrap
HTML Templating Engine
Backend
Node.js - The server
Express.js - Framework aka tool: makes controlling MVC logic easier
MongoDB
3. Development Environment Requirements
Node.js
nodemon
IDE, Coding Text Editor (Sublime, VS Code, Atom are good)
GitHub Desktop (Using Git on commandline works too)
Your favorite browser
Setting up Node.js
Head to: https://nodejs.org/en/
Download the current version. As of writing the version is 10.11.0. Newer versions are fine. Don't download LTS
Follow installation prompts. Use default values
Installing nodemon
Nodemon is a development tool that automatically reloads changes into the Node.js server, so that you do not have to restart the server for every change.

Open terminal/commandline.
Navigate to project directory
Execute npm install -g nodemon
FIRST TIME RUN
*** IMPORTANT ***

After pull down the codes, open a terminal/commandline, and navigate to project directory: Execute npm install

4. Starting Node Server
Open terminal/commandline.
Navigate to project directory
Execute nodemon start
Where Can I View the Webpage?
Starting up the Node Server allows you to run your own copy of the project. To view the website, head to http://localhost:3000 in your web browser.

5. Deploying Application Online (to Heroku) [UNAVAILABLE, NOT yet applied]
The master branch is always deployed online on Heroku. Whenever a commit is made onto master, Heroku will update and deploy the latest changes.