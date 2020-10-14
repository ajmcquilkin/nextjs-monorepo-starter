import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import {
  resourceRouter, itemRouter, groupRouter,
} from './routers';

import { SELF_URL, APP_URL } from './constants';

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const CASAuthentication = require('node-cas-authentication');

// initialize
const app = express();

console.log(`SELF: ${SELF_URL}, APP: ${APP_URL}`);
const returnURL = `http://${APP_URL}`;

const cas = new CASAuthentication({
  cas_url: 'https://login.dartmouth.edu/cas',
  service_url: `http://${SELF_URL}`,
  session_info: 'info',
  destroy_session: true,
  return_to: returnURL
});

// enable/disable cross origin resource sharing if necessary
app.use(cors({ credentials: true, origin: `http://${APP_URL}` }));

// DB Setup
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  loggerLevel: 'error',
};

// Connect the database
mongoose.connect(process.env.MONGODB_URI, mongooseOptions).then(() => {
  mongoose.Promise = global.Promise; // configures mongoose to use ES6 Promises
  console.log('Connected to Database');
}).catch((err) => {
  console.log('Not Connected to Database ERROR! ', err);
});

app.use(session({
  secret: process.env.AUTH_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// enable/disable http request logging
app.use(morgan('dev'));
app.use(express.static('dist'));

// enable json message body for posting data to API
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const apiRouter = express();

app.get('/api/login', cas.bounce, (req, res) => {
  res.status(200).send(req.session);
});

app.get('/api/logout', cas.logout, (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: 'Session Destroyed' });
});

app.use('/api', apiRouter);
// declare routers
apiRouter.use('/resources', resourceRouter); // NOTE: Partially secured to users
apiRouter.use('/items', itemRouter); //
apiRouter.use('/groups', groupRouter); //

// default index route
apiRouter.get('/', (req, res) => {
  res.send('Welcome to backend!');
});

// Custom 404 middleware
app.use((req, res) => {
  res.status(404).json({ message: 'The route you\'ve requested doesn\'t exist' });
});

// START THE SERVER
// =============================================================================
const PORT = process.env.PORT || 9090;
app.listen(PORT);
console.log(`listening on: ${PORT}`);
