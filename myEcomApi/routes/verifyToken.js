const jwt = require("jsonwebtoken");
//========================================================================
const verifyToken = (req, res, next) => {
  //we take token from our req header i.e req.headers
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; //split is used because we want to access only token not BEARER
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("Token is not valid");

      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You Are Not Authenticated");
  }
};
//=======================================================================

const verifyTokenAndAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(401).json("You Are Not allowed to do that");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(401).json("You Are Not allowed to do that");
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin };
