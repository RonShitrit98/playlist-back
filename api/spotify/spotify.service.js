const axios = require("axios");

async function getAuthToken(code) {
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    method: "post",
    params: {
      code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URL,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    json: true,
  };

  try {
    const data = await axios(authOptions);
    return data.data;
  } catch (error) {
    console.log(error);
  }
}

async function getUser(token) {
  console.log("getting user...");
  var authOptions = {
    url: "https://api.spotify.com/v1/me",
    method: "get",
    // params: {
    //   code,
    //   redirect_uri: process.env.SPOTIFY_REDIRECT_URL,
    //   grant_type: "authorization_code",
    // },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    json: true,
  };
  try {
    const res = await axios(authOptions);
    return res.data;
  } catch (error) {
    console.log(error);
  }
  // curl --request GET \
  //   --url https://api.spotify.com/v1/me \
  //   --header 'Authorization: ' \
  //   --header 'Content-Type: application/json'
}

module.exports = {
  getAuthToken,
  getUser,
};
