const bcrypt = require("bcrypt");
const userService = require("../user/user.service");
const logger = require("../../services/logger.service");

async function login(email, password) {
  logger.debug(`auth.service - login with username: ${email}`);
  const user = await userService.getByEmail(email);
  if (!user) return Promise.reject("Invalid username or password");
  const match = await bcrypt.compare(password, user.password);
  if (!match) return Promise.reject("Invalid username or password");

  delete user.password;
  user._id = user._id.toString();
  return user;
}

async function signup(username, password, email, imgUrl) {
  const saltRounds = 10;

  logger.debug(
    `auth.service - signup with username: ${username}, fullname: ${email}`
  );
  if (!username || !password || !email)
    return Promise.reject("email, username and password are required!");

  const userExist = await userService.getByUsername(username);
  if (userExist) return Promise.reject("Username already taken");
  const emailExist = await userService.getByEmail(email);
  if (emailExist) return Promise.reject("email already taken");

  const hash = await bcrypt.hash(password, saltRounds);
  return userService.add({ username, password: hash, email, imgUrl });
}

async function googleSignup(user) {
  const userExist = await userService.getByEmail(user.email);
  if (userExist) {
    delete userExist.password;
    return userExist;
  }
  return userService.add(user);
}

module.exports = {
  signup,
  login,
  googleSignup,
};
