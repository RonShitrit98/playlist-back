const bcrypt = require("bcrypt");
const userService = require("../user/user.service");
const logger = require("../../services/logger.service");

async function login(username, password) {
  logger.debug(`auth.service - login with username: ${username}`);
  const user = await userService.getByUsername(username);
  console.log(user.password, password);
  if (!user) return Promise.reject("Invalid username or password");
  // TODO: un-comment for real login
  console.log(password, user.password);
  const match = await bcrypt.compare(password, user.password);
  console.log(match);
  if (!match) return Promise.reject("Invalid username or password");

  delete user.password;
  user._id = user._id.toString();
  return user;
}

// (async ()=>{
//     await signup('bubu', '123', 'Bubu Bi')
//     await signup('mumu', '123', 'Mumu Maha')
// })()

async function signup(username, password, fullname, imgUrl) {
  const saltRounds = 10;

  logger.debug(
    `auth.service - signup with username: ${username}, fullname: ${fullname}`
  );
  if (!username || !password || !fullname)
    return Promise.reject("fullname, username and password are required!");

  const userExist = await userService.getByUsername(username);
  if (userExist) return Promise.reject("Username already taken");

  const hash = await bcrypt.hash(password, saltRounds);
  return userService.add({ username, password: hash, fullname, imgUrl });
}

async function googleSignup(user) {
  const userExist = await userService.getByUsername(user.username);
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
