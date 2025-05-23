const authorize = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!roles.includes(userRole)) {
      return res
        .status(403)
        .json({ message: "Forbidden: You don't have perimission." });
    }
    next();
  };
};

export default authorize;
