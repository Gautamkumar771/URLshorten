// Import the getUser function for authentication from the auth service
const { getUser } = require("../service/auth");


// Middleware to restrict access to logged-in users only
async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;

  if (!userUid) return res.redirect("/login");
  const user = getUser(userUid);

  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}


// Middleware to check authentication status
async function checkAuth(req, res, next) {
   // Get the user session ID from the request cookies
  const userUid = req.cookies?.uid;

  const user = getUser(userUid);
 // Attach the user object to the request for further handling in the route
  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};
