const users = {};

function isValidUsername(username) {
  let isValid = true;
  isValid = isValid && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
}

function isValidWord(word) {
  let isValid = true;
  isValid = isValid && word.match(/^[A-Za-z]*$/);
  return isValid;
}

function getUserData(username) {
  return users[username]
}

function addUserData(username, userData) {
  users[username] = userData;
}


module.exports = {
  isValidUsername,
  isValidWord,
  users,
  getUserData,
  addUserData
};
