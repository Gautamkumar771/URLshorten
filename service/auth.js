// Create a Map to store user information based on session IDs
const sessionIdToUserMap = new Map();

// Function to set user information in the map based on the session ID
function setUser(id, user) {
  sessionIdToUserMap.set(id, user);
}
// Function to retrieve user information from the map based on the session ID
function getUser(id) {
  return sessionIdToUserMap.get(id);
}

module.exports = {
  setUser,
  getUser,
};
