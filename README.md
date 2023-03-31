Steps:

1. Create client folder\
   -install all dependencies from package.json\
   -create pages and routes with react-router-dom: home, login, register
2. create server folder\
   -create dbConfig.js where we create connection with mongoDB\
   -create server.js where we create server with express and connect with \
   -mongoDB from dbConfig.js\
   -create models folder where we create schema for our data\
   -create userModel.js where we create schema for user\
   -create routes folder in server folder where we create routes for our server\
   -create userRoutes.js where we create routes for user\
   -install bcryptjs for hashing password inside userRoutes.js\
   -create login and register routes\
   -add routes to server.js
3. in package.json add proxy: "http://localhost:5000" to avoid \
   -cross-origin errors\
   -add apicalls.js to client folder where we create functions for our api calls\
   -create axios instance in index.js from appiCalls folder\
   -call RegisterUser and LoginUser functions from apiCalls.js in Register.js and Login.js \
   -add token to local storage Login.js\
   -after login redirect to home page and check token exist in localStorage\
   -add nodemon.json to ignore client folder\
