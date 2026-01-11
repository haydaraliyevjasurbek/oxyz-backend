const auth = (req, res, next) => {
  const tokent = req.headers.authorization;
  if (tokent === "12345") {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized chumo" });
  }
};

module.exports = auth;
