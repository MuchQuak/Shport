# 308-309 Project
Web app for gathering sports information to allow users to follow and keep up to date with their favorite sports teams or leagues.

![Build](https://github.com/MuchQuak/308-309_Project/actions/workflows/node.js.yml/badge.svg)

### Frontend
https://shport.app/
### Backend
https://shport-backend.herokuapp.com/

To gain access you must have a .env file in backend folder with variables:
- MONGODB_URI with credentials from mongoDB access key.
- NEWSAPI_KEY with a valid News API key.
- TOKEN_SECRET with a secret token.

[Figma Model](https://www.figma.com/file/f0ucVt7mll86NFlnncH12G/Main?node-id=0%3A1)

[Project Spec](https://docs.google.com/document/d/1CvLTWCfVWaoY2mrt_GCotynXVKvXM6Ump93yK021D_0/edit?usp=sharing)


Code Coverage Report

03/14/2022

File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s   
----------------------|---------|----------|---------|---------|---------------------
All files             |    76.5 |    72.22 |   85.29 |    76.5 |                     
 leagueService.js     |   48.48 |     12.5 |   77.77 |   48.48 | 20-46               
 prefSchema.js        |     100 |      100 |     100 |     100 |                     
 sportInfoServices.js |   54.34 |       30 |    62.5 |   54.34 | 8,26-27,36-37,50-80 
 sportSchema.js       |     100 |      100 |     100 |     100 | 
 userSchema.js        |     100 |      100 |     100 |     100 | 
 userServices.js      |   93.82 |    97.22 |     100 |   93.82 | 15,100-101,125-126 
