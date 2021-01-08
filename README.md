# ITC VOX

[Deployed Site](https://itc-vox.herokuapp.com)

This repository holds the code for the ITC Vox webapp, used for the creation, moderation, and publication of Vox daily information.  

# Stack

This app uses a React+Redux frontend served from a Node.js backend using Express + Mongoose, able to be deployed as a single server for Dartmouth ITC purposes. It is deployed through Heroku and uses a MongoDB database. 

### Development mode

In the development mode, we will have 2 servers running. The front end code will be served by the [webpack dev server](https://webpack.js.org/configuration/dev-server/) which helps with hot and live reloading. The server side Express code will be served by a node server using [nodemon](https://nodemon.io/) which helps in automatically restarting the server whenever server side code changes.

### Production mode

In the production mode, we will have only 1 server running. All the client side code will be bundled into static files using webpack and it will be served by the Node.js/Express application.

### Deployment
The app is deployed through heroku, where is it built and run with `yarn start`. 
## Quick Start

```bash
# Clone the repository
git clone https://github.com/dali-lab/itc-vox.git

# Install dependencies
yarn 

# Add the .env file to the root directory

# Start development server
yarn dev 

# Build for production
yarn build 

# Start production server
yarn start 
```

### Folder Structure

All the source code will be inside **src** directory. Inside src, there is client and server directory. All the frontend code (react, css, js and any other assets) will be in client directory. This holds actions, components, containers, hocs, reducers, and styles. 

 Backend Node.js/Express code will be in the server directory. This contains models, routers, and controllers, 

### Authors

Fall 2020
 - Nathan Schneider '22
 - Ray Huang '21
 - Adam McQuilkin '22
### Acknowledgments

Adam McQuilkin + DALI Lab CRUD Templates

https://github.com/dali-lab/crud-template-frontend

https://github.com/dali-lab/crud-template-backend

crsandeep's full-stack deployment on a single Node.js server

https://github.com/crsandeep/simple-react-full-stack