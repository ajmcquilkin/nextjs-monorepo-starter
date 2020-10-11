/* eslint-disable func-names */
const result = require('dotenv').config({ debug: process.env.DEBUG });

console.assert(!result.error, JSON.stringify(result, null, '\t'));

// Create function to transmit result of authenticate() call to user or next middleware
const requireLogin = function (req, res, next) {
  // console.log(req.session.info);
  if (!(req.session.info)) return res.status(401).json({ error: 'Invalid Cookie, Login' });
  return next();
};

export default requireLogin;
