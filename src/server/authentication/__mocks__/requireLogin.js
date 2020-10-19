import { mockSession } from '../../../../__jest__/helpers';

const requireLogin = (req, res, next) => {
  // Reject with 401 if no bearer token
  if (!req.get('Cookie')) return res.status(401).json({ message: 'Error authenticating cookie' });

  req.session = mockSession;
  return next();
};
// const requireLogin = function (req, res, next) {
  // if (!(req.session.info)) return res.status(401).json({ message: 'Invalid Cookie, Login' });
//   req.session = {cas_user:"f003f66",info:{netid:"f003f66"}}
//   return next();
// };

export default requireLogin;
