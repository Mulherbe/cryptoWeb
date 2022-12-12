const axios = require('axios');
const query_string = require ('querystring');
const google_auth_token_endpoint ='https://accounts.google.com/o/oauth2/auth';
const google_access_token_endpoint = 'https://oauth2.googleapis.com/token';
const url_profile_data = "https://www.googleapis.com/oauth2/v1/userinfo?alt=json";
const url_openId = "https://openidconnect.googleapis.com/v1/userinfo";

const query_params = {
  client_id: "131515680100-sb9rhpqs9hhu2qqkrir3v41a2h6gp3vt.apps.googleusercontent.com",
  redirect_uri: `http://localhost:5000/api/callback`,
  
};

const auth_token_params = {
  ...query_params,
  response_type: 'code',
};

// le scope est une chaine de caractère qui contient les informations que l'on veut récupérer
const scopes = ['profile', 'email', 'openid'];
// l'url pour récupérer le code d'autorisation
const request_get_auth_code_url = `${google_auth_token_endpoint}?${query_string.stringify(auth_token_params)}&scope=${scopes.join(' ')}`;
  
const get_access_token = async (authorization_token) => {
  const access_token_params = {
    ...query_params,
      client_secret: "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",
      code: authorization_token,
      grant_type: 'authorization_code',
  };
  return await axios({
    method: 'post',
    url: `${google_access_token_endpoint}?${query_string.stringify(access_token_params)}`,
  });
};

const get_user_info = async (access_token) => {
  return await axios({
    method: 'get',
    url: url_openId
  });
};




module.exports = {
  request_get_auth_code_url,
  get_access_token,
  get_user_info,

};
//test