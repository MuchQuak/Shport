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

function ESTtoUTC(time) {
   const timeParts = time.split(' ');

   if(timeParts.length < 2) {
      return time;
   }
   const t = new Date()
   const pmAm = timeParts[1];
   const newtime = timeParts[0].split(':');
   const offset = pmAm[0] === 'A' ? 0 : 12;
   //Page is in est instead of pst for some reason so -3 is needed
   const hour = parseInt(newtime[0]) + offset - 3;
   const min = parseInt(newtime[1]);
   t.setHours(hour);
   t.setMinutes(min); 
   return new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate(), 
      t.getUTCHours(), t.getUTCMinutes(), 0));
}

exports.ESTtoUTC = ESTtoUTC;
exports.decode = decode;
exports.authenticateUser = authenticateUser;
exports.generateAccessToken= generateAccessToken;
