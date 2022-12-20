# Flow Create

Yoga is becoming a more prominent activity in the western world. Dozens of apps exist within the market that offer specialized routines for people to follow. These routines, eg powerflow or restorative, are built by practicing yogis who advertise their app for others to follow. 

Flow Create was created to give the user more customization of the routines people choose to build and follow. With over 100 yoga poses to choose from, the user can mix and match any of them into as many routines as they choose to create. 

# Production

 ## This is a **MERN** stack application.

- **M**ongodb was used to store data on the user, pose, and routine models.
- **E**xpress was used to create controllers to produce a backend api, calling GET, PUT, POST, and DELETE routes for the user, poses, and routines.
- **R**eact was used to create an interactive front-end experience for the end user.
- **N**ode was used to bring all the packages together to produce Flow Create.

# Wire-frame for initial ideas:

<img 
src="https://i.imgur.com/Zo9UYy8.jpeg" 
alt="Yoga-Wireframe" 
width="400" 
height="800">

# Relationships (ERD)
<img 
src="https://i.imgur.com/ihBVWnT.png" 
alt="Yoga-Wireframe" 
width="400" 
height="300">

# Stretch Goals
- Connect frontend to backend
- Add search function to front end (search for name, tags, difficulty, etc)
- Display pictures, difficulty, and description on frontend
- Add time component to front end

## Big Stretch Goals
- Add playlist randomizer to front end based on tags or difficulty
- Add playback component to play routine in real time on frontend
- Add submission form of new poses to front end


# Installation
1. Go to the [frontend](https://github.com/Coreyimurphy91/Yoga-Frontend) and [backend](https://github.com/Coreyimurphy91/Yoga-Backend) repositories on my Github.
2. Fork and clone each repository to your local machine. Open each in your personal IDE. You will need MongoDB installed.

## Front End
1. Install dependencies in terminal 
```
npm install
```
2. Create a .env file within your frontend home directory, and add your React URL to connect to the backend.
```
echo REACT_APP_SERVER_URL=http://localhost:8000 > .env
```
3. Start React application
```
npm start
```
## Back End
1. Install dependencies in terminal
```
npm install
```
2. Create a .env file within your backend home directory, where you will add two variables.
```
touch .env
```
- Open your .env file. The first variable is going to be 
```
MONGO_CONNECTION_STRING=
```
- To acquire your personal Mongo connection string, you need to open up your MongoDB, right click on your cluster, and click ```copy connection string```. From there, paste it after ```MONGO_CONNECTION_STRING=``` in the .env file.
- The second variable will be ```JWT_SECRET```. You can make it equal to any string you like. An example is below
```
JWT_SECRET=YourPersonalExample
```
3. Seed your database with the seed-examples.js file within the seed folder. To do this, type in your terminal
```
node seed/seed-examples.js
```
4. Now that your databse is populated, you can run the backend application with your terminal using the command
```
node app.js
```

## Running

Now that both apps are up and running, you can start to play with Flow Create on your own local host.