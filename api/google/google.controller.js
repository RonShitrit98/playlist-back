const authController = require("../auth/auth.controller");
const googleService = require("./google.service");
const authService = require("../auth/auth.service");
const logger = require("../../services/logger.service");

async function getOauthToken(req, res) {
  try {
    const code = req.query.code;
    console.log(req.query.state);
    const { id_token, access_token } = await googleService.getOauthToken(code);
    const user = await googleService.getGoogleUser(id_token, access_token);
    console.log(user);
    if (req.query.state === "login") {
      const account = await authService.login(user, "google");
      req.session.user = account;
      res.redirect("http://127.0.0.1:5173/#/");
    } else {
      const u = {
        username: null,
        email: user.email,
        fullname: user.family_name
          ? `${user.given_name} ${user.family_name}`
          : user.given_name,
        imgUrl: user.picture,
        media: {
          movies: [],
          music: [],
        },
        type: "google",
        isActivated: false,
      };
      const account = await authService.googleSignup(u);
      req.session.user = account;
      res.redirect("http://127.0.0.1:5173/#/auth/create/");
    }
  } catch (error) {
    logger.error(error);
  }
}

module.exports = {
  getOauthToken,
};

// {
//     code,
//   }: {
//     code: string;
//   }): Promise<GoogleOauthToken> => {
//     const rootURl = 'https://oauth2.googleapis.com/token';

//     const options = {
//       code,
//       client_id: config.get<string>('googleClientId'),
//       client_secret: config.get<string>('googleClientSecret'),
//       redirect_uri: config.get<string>('googleOauthRedirect'),
//       grant_type: 'authorization_code',
//     };
//     try {
//       const { data } = await axios.post<GoogleOauthToken>(
//         rootURl,
//         qs.stringify(options),
//         {
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//         }
//       );

//       return data;
//     } catch (err: any) {
//       console.log('Failed to fetch Google Oauth Tokens');
//       throw new Error(err);
//     }
