Steps:

1. Create client folder
   -install all dependencies from package.json
   -create pages and routes with react-router-dom: home, login, register
2. create server folder
   -create dbConfig.js where we create connection with mongoDB
   -create server.js where we create server with express and connect with -mongoDB from dbConfig.js
   -create models folder where we create schema for our data
   -create userModel.js where we create schema for user
   -create routes folder in server folder where we create routes for our server
   -create userRoutes.js where we create routes for user
   -install bcryptjs for hashing password inside userRoutes.js
   -create login and register routes
   -add routes to server.js
