const requireLogin = (req, res, next) => {
  console.log(req.session);
  if (!req.session.info) return res.status(401).json({ message: 'Unauthorized' });
  return next();
};

export default requireLogin;
