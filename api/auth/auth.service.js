const bcrypt = require("bcrypt");
const userService = require("../user/user.service");
const logger = require("../../services/logger.service");

async function login(creds, type = "email") {
  try {
    logger.debug(`auth.service - login with email: ${creds.email}`);
    const user = await userService.getByEmail(creds.email);
    if (!user) return Promise.reject("No user with this Email");
    if (type === "google" && user.type === "google") {
      return user;
    } else {
      const match = await bcrypt.compare(creds.password, user.password);
      if (!match) return Promise.reject("Invalid username or password");
      delete user.password;
    }
    user._id = user._id.toString();
    return user;
  } catch (error) {
    logger.error(error);
  }
}

async function signup(user) {
  const saltRounds = 10;

  logger.debug(
    `auth.service - signup with username: ${user.username}, fullname: ${user.email}`
  );
  if (!user.username || !user.password || !user.email)
    return Promise.reject("email, username and password are required!");

  const userExist = await userService.getByUsername(user.username);
  if (userExist) return Promise.reject("Username already taken");
  const emailExist = await userService.getByEmail(user.email);
  if (emailExist) return Promise.reject("email already taken");

  user.password = await bcrypt.hash(user.password, saltRounds);
  return userService.add(user);
}

async function googleSignup(user) {
  const userExist = await userService.getByEmail(user.email);
  if (userExist) {
    delete userExist.password;
    return userExist;
  }
  return userService.add(user);
}

async function spotifySignup(user) {
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
  spotifySignup,
};
