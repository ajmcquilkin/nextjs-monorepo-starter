import { mockUser } from '../../../../__jest__/helpers';

const requireLogin = (req, res, next) => {
  // Reject with 401 if no bearer token
  if (!req.session.info) return res.status(401).json({ message: 'Error authenticating email and password' });

  req.user = mockUser;
  return next();
};

export default requireLogin;
