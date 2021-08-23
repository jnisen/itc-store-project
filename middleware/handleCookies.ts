export {};

export function userCookieRead(req, res, next) {
    try {
      const { userDetails } = req.cookies;
      
      if (userDetails) { 
        const cookie = JSON.parse(userDetails);
        const { username, email } = cookie;
        req.cookieExist = true;
        req.username = username;
        req.email = email;
        
        next();
        
      } else {
        req.cookieExist = false;
        res.status(404).send({cookieExist: req.cookieExist, message:'The session has expired. Please login again.'});
      }

    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  }

  export function userCookieWrite(req, res, next) {
    try {
      //Get the information from the body
      const { username, email } = req.body;
      if ((!username) || (!email)) throw new Error("User details processing issues");

      //Here I set the cookie
      const cookieToWrite: string = JSON.stringify({ username, email });
      res.cookie("userDetails", cookieToWrite, { maxAge: 900000, httpOnly: true });

      req.username = username;
      req.email = email;

      //"Next" means that I will continue with the Route
      next();

    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  }