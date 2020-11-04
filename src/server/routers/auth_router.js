/* eslint-disable camelcase */
import express from 'express';

import { SELF_URL, APP_URL } from '../constants';

const router = express();
const CASAuthentication = require('node-cas-authentication');

const returnURL = `http://${APP_URL}`;

const cas = new CASAuthentication({
  cas_url: 'https://login.dartmouth.edu/cas',
  service_url: `http://${SELF_URL}/api/auth`,
  session_info: 'info',
  destroy_session: true,
  return_to: returnURL
});

router.get('/login', cas.bounce, (req, res) => {
  res.status(200).json(req.session);
});

router.get('/logout', cas.logout, (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: 'Session Destroyed' });
});

router.get('/user', (req, res) => {
  const authenticated = req.session.cas_user != null;

  let netid;
  if (authenticated && !req.session.info.netid) {
    netid = req.session.cas_user;
  } else {
    netid = authenticated ? req.session.info.netid : null;
  }

  const reviewer = authenticated && isNaN(netid.indexOf(netid.length - 1));

  res.status(200).json({ authenticated, reviewer, netid });
});

export default router;
