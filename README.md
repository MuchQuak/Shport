# Shport
Web app for gathering sports information to allow users to follow and keep up to date with their favorite sports teams or leagues.

![Build](https://github.com/MuchQuak/308-309_Project/actions/workflows/node.js.yml/badge.svg)

### Frontend
https://shport.app/
### Backend
https://shport-backend.herokuapp.com/

### Setting up the Project
To gain access you must have a .env file in backend folder with variables:
- MONGODB_URI with credentials from mongoDB access key.
- NEWSAPI_KEY with a valid News API key.
- TOKEN_SECRET with a secret token.
- PORT a number so that it can tell the difference between Heroku or localhost

 ### Steps
 Create your directory then call<br />
 git clone https://github.com/MuchQuak/308-309_Project <br />
    This clones the project<br />
 cd 308-309_Project/backend<br />
    Create the .env file with the variables above<br />
 npm install<br />
    To install all dependencies required for the backend<br />
 cd ../frontend<br />
 npm install<br />
     Installs the required dependencies for the front end<br />
 cd ..<br />
 npm install<br />
    Installs the required dependicies for the very root of the project<br />
   
   ### Starting the app locally (assuming you're at the root folder)
   cd frontend<br />
   npm start<br />
   
   cd backend<br />
   node index.js<br />
   
   ### Starting tests
   cd backend<br />
   npm run test<br />
   
   ### Cypress
   npx cyrpess open<br />
   
 
Install all dependencies that are required. 
 
[Figma Model](https://www.figma.com/file/f0ucVt7mll86NFlnncH12G/Main?node-id=0%3A1)

[Project Spec](https://docs.google.com/document/d/1CvLTWCfVWaoY2mrt_GCotynXVKvXM6Ump93yK021D_0/edit?usp=sharing)

[Sequence Diagram](https://app.diagrams.net/#G1QEdEjMCj-P-oYIIvUOYg4TIT5hP-Cz1E)


Code Coverage Report

06/03/2022
File                     | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------------|---------|----------|---------|---------|----------------------------------------------------------
All files                |   80.15 |    67.76 |   77.88 |   80.58 |                                                          
 models/caching          |   80.85 |       50 |     100 |   80.85 |                                                          
  cachingServices.js     |   76.92 |       50 |     100 |   76.92 | 12,33-34,49-50,60-61,75-76                               
  games.js               |     100 |      100 |     100 |     100 |                                                          
  standings.js           |     100 |      100 |     100 |     100 | 
 models/sport            |   48.42 |       20 |   57.14 |   51.11 | 
  leagueService.js       |   36.36 |       10 |   53.84 |   38.09 | 20-68
  sportInfoServices.js   |   54.34 |       30 |    62.5 |   58.13 | 9,27-28,37-38,51-74
  sportSchema.js         |     100 |      100 |     100 |     100 | 
 models/user             |   90.55 |    86.66 |      96 |   90.55 | 
  prefSchema.js          |     100 |      100 |     100 |     100 | 
  userSchema.js          |     100 |      100 |     100 |     100 |
  userServices.js        |   88.99 |    86.66 |   95.65 |   88.99 | 14,80-83,96-97,111-112,129-131,150-151
 scraper                 |   84.76 |       72 |      75 |   84.46 |
  scheduleScrape.js      |   82.64 |    56.86 |   81.81 |   82.05 | 21-31,37,69,76,87,96-103,110,139-140,163,199,207,232-233
  standingsScrape.js     |    98.9 |      100 |    92.3 |   98.86 | 63
  teamExpansionScrape.js |   77.85 |    77.77 |   64.28 |   77.85 | 51,113-122,149,188-263,296,342
