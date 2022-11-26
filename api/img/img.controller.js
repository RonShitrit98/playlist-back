// const logger = require("../../services/logger.service");
// const userService = require("../user/user.service");
// const socketService = require("../../services/socket.service");
const cloudinary = require("cloudinary").v2;
require('dotenv').config()
// const imgService = require("./img.service");

// async function getGames(req, res) {
//     try {
//       // const filterBy = {id: userId}
//       const games = await gameService.query(req.query);
//       res.send(games);
//     } catch (err) {
//       // logger.error("Cannot get games", err);
//       res.status(500).send({ err: "Failed to get games" });
//     }
//   }

const cloudinaryConfig = cloudinary.config({
  
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDINARYSECRET,
  secure: true,
});

async function getSignature(req, res) {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature =  cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    cloudinaryConfig.api_secret
  );
 return res.json({ timestamp, signature });
}

module.exports = {
  getSignature,
};
