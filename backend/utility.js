const jwt = require("jsonwebtoken");

function decode(req) {
  try {
    const authHeader = req.headers["authorization"];
    //Getting the 2nd part of the auth header (the token)
    const token = authHeader && authHeader.split(" ")[1];
    return jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (error) {
    return false;
  }
}

function generateAccessToken(username) {
  return jwt.sign({ username: username }, process.env.TOKEN_SECRET, {
    expiresIn: "60000s",
  });
}

function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  //Getting the 2nd part of the auth hearder (the token)
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    console.log("No token received");
    return res.status(401).end();
  } else {
    try {
      jwt.verify(token, process.env.TOKEN_SECRET);
      next();
    } catch (error) {
      console.log(error)
      return res.status(401).end();
    }
  }
}

exports.decode = decode;
exports.authenticateUser = authenticateUser;
exports.generateAccessToken= generateAccessToken;
