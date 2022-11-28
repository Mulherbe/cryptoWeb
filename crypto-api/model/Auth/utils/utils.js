const query_string = require ('querystring');
const axios = require ('axios');
const google_access_token_endpoint = 'https://oauth2.googleapis.com/token';
const google_auth_token_endpoint ='https://accounts.google.com/o/oauth2/v2/auth';

const query_params = {
    client_id: process.env.CLIENT_APP_ID || '131515680100-sb9rhpqs9hhu2qqkrir3v41a2h6gp3vt.apps.googleusercontent.com',
    redirect_uri: `http://localhost:5000${process.env.REDIRECT_URI || '/api/callback'}`,
};

const auth_token_params = {
...query_params,
response_type: 'code',
};

const get_access_token = async auth_code => {
    const access_token_params = {
            ...query_params,
            client_secret: process.env.CLIENT_APP_SECRET || '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',
            code: auth_code,
            grant_type: 'authorization_code',
        };

        return await axios ({
        method: 'post',
        url: `${google_access_token_endpoint}?${query_string.stringify (access_token_params)}`,
        });
    };

// the scopes (portion of user's data) we want to access
const scopes = ['profile', 'email', 'openid'];
// a url formed with the auth token endpoint and the
const request_get_auth_code_url = `${google_auth_token_endpoint}?${query_string.stringify (auth_token_params)}&scope=${scopes.join (' ')}`;

const get_profile_data = async access_token => {
        return await axios ({
        method: 'post',
        url: `https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${access_token}`,
        });
    };


module.exports ={
    request_get_auth_code_url,
    get_access_token,
    get_profile_data,
};