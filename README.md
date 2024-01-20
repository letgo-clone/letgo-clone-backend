# Letgo Clone Backend

![screenshot](https://raw.githubusercontent.com/letgo-clone/letgo-clone-backend/main/public/api-docs.png)

## Hello Everyone
I created the backend side with the Rest API (RESTful API) service using NodeJS with Typescript.

### Features
* NodeJS with Typescript 
* ExpressJS
* Rest API (RESTful API)
* OAuth 2.0 Authorization
* Access and Refresh token creation using JWT
* Redis
* PostgreSQL
* Firebase

## Deploy (Railway)
https://tacky-selection-production.up.railway.app/

## Requirements
* NodeJS (min v20.10.0)
* PostgreSQL server
* Redis

## How to install

* ### STEP 1: Create the ".env" file. and add the following
  
```
ACCESS_TOKEN_SECRET = bffa6ae98caa7d8279807a57e5609f71f1e36fcc0ee0161a7ea5c048efb0072580ab27c906da5b645f43f08a017eb3cb8fc9c9539528cfab491251fcc4cb875c
CLIENT_ID_CLIENT = letgo_clone_client
CLIENT_ID_PASSWORD = letgo_clone_account
CLIENT_SECRET = CLIENT_SECRET
CLIENT_SECRET_CLIENT = 7f68ee6df7739cda
CLIENT_SECRET_PASSWORD = d554937a45e5be23
REFRESH_TOKEN_SECRET = 7c8144e0622325fc956fa5b3fed0e5d43e13372e5a7587b850daf28a1c2b81f966320cc19e01931cf16af7f2ea9137c5e444bda21f27af3d7cd60398862580ef
```  

* ### STEP 2: You should download and install redis on your computer

    * Redis for [macOS and Linux](https://redis.io/download/)  
    * Redis for [Windos](https://www.youtube.com/watch?v=4ePdm4AyL0s)  

* ### STEP 3: You need to take  <u>"clone-db.sql"</u> and import it to postgreSQL local server

* ### STEP 4: Firebase
    - STEP 4.1: You should create a new project from Firebase and download the <u>Firebase JSON Config</u> file
    - STEP 4.2: Rename the downloaded file to <u>"firebase-adminsdk.json"</u>
    - STEP 4.3: You should move the <u>"firebase-adminsdk.json"</u> file into the <u> "./config" </u> folder of the project.


* ### STEP 5: Typescript should be installed globally
```
npm install -g typescript
```

* ### install all packages with the command
```
npm install
npm run build
npm run dev
```

* ### 🎉 The project will run on port 8080. now the backend installation is complete, you can install the frontend side

## Package.json

```
{
  "name": "letgo-clone-backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "npx nodemon src/index.ts",
    "debug": "nodemon --exec \"node --inspect-brk=0.0.0.0:9229 --require ts-node/register src/index.ts\""
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/cors": "^2.8.16",
    "@types/express": "^4.17.21",
    "@types/multer": "^1.4.11",
    "@types/node": "^20.9.0",
    "@types/pg": "^8.10.9",
    "@types/swagger-jsdoc": "^6.0.4",
    "@types/swagger-ui-express": "^4.1.6",
    "nodemon": "^3.0.1",
    "ts-node": "^10.9.1",
    "typescript": "^5.2.2"
  },
  "dependencies": {
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "ejs": "^3.1.9",
    "express": "^4.18.2",
    "firebase-admin": "^11.11.1",
    "joi": "^17.11.0",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5-lts.1",
    "pg": "^8.11.3",
    "redis": "^4.6.10",
    "sharp": "^0.33.0",
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^5.0.0",
    "uuid": "^9.0.1"
  }
}
```


Good Encodings





