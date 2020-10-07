import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';

import {
  authRouter, userRouter, resourceRouter, searchRouter, itemRouter, groupRouter,
} from './routers';

import { requireAuth } from './authentication';

// initialize
const app = express();

// enable/disable cross origin resource sharing if necessary
app.use(cors());

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
apiRouter.use('/users', requireAuth, userRouter); // NOTE: Completely secured to users
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