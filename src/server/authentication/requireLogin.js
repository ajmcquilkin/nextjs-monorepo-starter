const requireLogin = (req, res, next) => {
  if (!req.session.info) return res.status(401).json({ message: 'Unauthorized' });

  // default CAS return
  if (req.session.info.netid) {
    return next();
  }

  // deployed CAS return
  req.session.info.netid = req.session.cas_user;
  req.session.cas_user = req.session.info.email;
  return next();
};

export default requireLogin;
