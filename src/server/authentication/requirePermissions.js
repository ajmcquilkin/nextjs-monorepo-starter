/* eslint-disable func-names */

const requirePermissions = function (req, res, next) {
  // eslint-disable-next-line prefer-arrow-callback
  if (!(req.session.info)) return res.status(401);
  if (req.session.info.netid !== 'f003f66') {
    return res.status(403).json({ error: 'User not authorized' });
  }
  return next();
};
export default requirePermissions;
