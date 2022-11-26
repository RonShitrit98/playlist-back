const authController = require("../auth/auth.controller");
const googleService = require("./google.service");
const authService = require("../auth/auth.service");
// const logger = require('../../services/logger.service')

async function getOauthToken(req, res) {
  const code = req.query.code;
  const { id_token, access_token } = await googleService.getOauthToken(code);
  const user = await googleService.getGoogleUser(id_token, access_token);
  const u = {
    username: user.email,
    fullname: `${user.given_name} ${user.family_name}`,
    imgUrl: user.picture,
  };
  const account = await authService.googleSignup(u);
  req.session.user = account;
  res.redirect('http://127.0.0.1:5173/');
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
