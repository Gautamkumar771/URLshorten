// Import the uuid library to generate unique identifiers
const { v4: uuidv4 } = require("uuid");
// Import the User model and the setUser function for authentication
const User = require("../models/user");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  // Extract user information from the request body
  const { name, email, password } = req.body;
    // Create a new user in the database
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user)
    return res.render("login", {
      error: "Invalid Username or Password",
    });

      // Generate a new session ID using uuidv4
  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId);
  return res.redirect("/");
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
