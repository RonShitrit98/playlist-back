const axios = require("axios");
require("dotenv").config();
const qs = require("qs");
// const logger = require("../../services/logger.service");

async function getOauthToken(code) {
  const rootURl = "https://oauth2.googleapis.com/token";
  const options = {
    code,
    client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
    client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL,
    grant_type: "authorization_code",
  };
  try {
    const { data } = await axios.post(rootURl, qs.stringify(options), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function getGoogleUser(idToken, accessToken){
try{
    const { data } = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
  
      return data;
}catch{

}
}

module.exports = {
  getOauthToken,
  getGoogleUser
};

