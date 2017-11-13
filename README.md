# Whiteboard Node.js 

Writeboard is a free speech wall build with a socket server on Node.js. Rich text and media is supported with the Cloudinary API. If it is still up, it can be found here: https://calpoly-devcamp.herokuapp.com/.

This web application is built on top of the Heroku Tutoiral found here: [Getting Started with Node on Heroku].

## Developer Notes: Running Locally

We are using Nodemon which can be installed [here](https://www.npmjs.com/package/nodemon)
- Running your local server: 
'''nodemon index.js'''
Quit the server using CTRL-C
- set databaseMode = false in the database_manager (cannot hit the mongoDB instance locally. if you want to configure that, be my guest)
- You can now open your instance @ http://localhost:5000/


## Developer Notes: Deploying to Heroku
- git pull --rebase ALWAYS (add packages using npm install just in case_
- '''git push ''' to master AND THE PIPELINE DEPLOYS FOR US <3 <3 <3 
- if you are testing database changes, make sure to set the databaseMode = true and deploy to stage before pushing to Prod

See the initial googledoc here: https://docs.google.com/document/d/1R8JwFRfFIoMxX9opSAVR-cSJHpxQqNU_gkiRC35pjuU/edit?usp=sharing
