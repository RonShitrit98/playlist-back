const axios = require("axios");
const spotifyService = require("./spotify.service");
const authService = require("../auth/auth.service");

async function getAuthToken(req, res) {
  try {
    const tokens = await spotifyService.getAuthToken(req.query.code);
    req.session.spotify = {
      refresh_token: tokens.refresh_token,
      access_token: tokens.access_token,
    };
    const data = await spotifyService.getUser(tokens.access_token);
    console.log(data);
    const user = {
      username: "",
      fullname: data.display_name,
      email: data.email,
      imgUrl: data.images[0].url,
      media: {
        movies: [],
        music: [],
        urls: {
          spotify: data.href,
        },
      },
      type: "spotify",
      isActivated: false,
    };
    const account = await authService.spotifySignup(user);
    req.session.user = account;
    res.redirect("http://127.0.0.1:5173/#/auth/create/");
  } catch (error) {
    console.log(error);
  }
}

async function getRefreshToken(req, res) {
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
    },
    params: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        access_token: access_token,
      });
    }
  });
}

module.exports = {
  getAuthToken,
  getRefreshToken,
};
