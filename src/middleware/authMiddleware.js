const jwt = require("jsonwebtoken");


const whenExpire = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    const formattedDate = date.toLocaleString("en-US", {
      timeZone: "Asia/Yangon",
    });

    return formattedDate;
  };

  const isTokenExpired = (token) => {
    try {
      const decoded = jwt.decode(token);
      console.log("token expire in", whenExpire(decoded.exp));
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      return decoded.exp < currentTime;
    } catch (err) {
      console.error("Invalid token");
      return true; // Treat invalid tokens as expired
    }
  };  

const auth = (req, res, next) => {
    const authorization = req.headers.authorization;
    const token = authorization && authorization.split(" ")[1];
    
    const expired = isTokenExpired(token);

    if (!authorization) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    if (expired) {
        return res.status(401).json({ error: "Token expired login again" });
      } else {
        try {
            next();
          
        } catch (error) {
          return res.status(401).json({ error: "Unauthorized" });
        }
      }

   
    


}


module.exports =auth;