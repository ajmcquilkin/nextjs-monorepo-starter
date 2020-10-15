import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import {
  authRouter, userRouter, resourceRouter, searchRouter, itemRouter, groupRouter,
} from './routers';

import { requireLogin } from './authentication';
import { SELF_URL, APP_URL } from './constants';

const session = require('express-session');
const CASAuthentication = require('node-cas-authentication');

// initialize
const app = express();

app.use(session({
  secret: 'super secret key',
  resave: false,
  saveUninitialized: true
}));

const returnURL = `http://${APP_URL}`;
console.log(`Return ${returnURL}`);

const cas = new CASAuthentication({
  cas_url: 'https://login.dartmouth.edu/cas',
  service_url: 'http://localhost:9090',
  session_info: 'info',
  return_to: returnURL
});

// enable/disable cross origin resource sharing if necessary
app.use(cors({ credentials: true, origin: `http://${APP_URL}` }));

app.get('/api/login', cas.bounce, (req, res) => {
  console.log(req.session);
  res.status(200).send(req.session);
});
app.get('/api/auth', (req, res) => {
  console.log(req.headers.cookie);
  console.log(req.session.cas_user);
  res.send(req.session);
});

// enable/disable http request logging
app.use(morgan('dev'));
app.use(express.static('dist'));

// enable json message body for posting data to API
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const apiRouter = express();
app.use('/api', apiRouter);
// declare routers

apiRouter.use('/auth', authRouter); // NOTE: Not secured
apiRouter.use('/users', requireLogin, userRouter); // NOTE: Completely secured to users
apiRouter.use('/resources', resourceRouter); // NOTE: Partially secured to users
apiRouter.use('/search', searchRouter); //
apiRouter.use('/items', itemRouter); //
apiRouter.use('/groups', groupRouter); //

// default index route
apiRouter.get('/', (req, res) => {
  res.send('Welcome to backend!');
});

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

// Custom 404 middleware
app.use((req, res) => {
  res.status(404).json({ message: 'The route you\'ve requested doesn\'t exist' });
});

// START THE SERVER
// =============================================================================
const PORT = process.env.PORT || 9090;
app.listen(PORT);
console.log(`listening on: ${PORT}`);
