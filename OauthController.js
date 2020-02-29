const OAuth2Data = require('./google_key.json');
const { google } = require('googleapis');


const REDIRECT_URL = "http://localhost:8080/Oauth/Redirect";//OAuth2Data.web.redirect_uris;

// const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
// var authed = false;

//Oauth 2
exports.Oauth = function(req, res, next) {
    var axios = require('axios');

const clientID  = "a92cb6693aa07cc042ed"//OAuth2Data.web.client_id;
const clientSecret  = "39c6bf048340f9d68ca46368a54e0f67b946cbe7";//OAuth2Data.web.client_secret;
    const requestToken = req.query.code
    console.log(requestToken);
    axios({
        // make a POST request
        method: 'post',
        // to the Github authentication API, with the client ID, client secret
        // and request token
        url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
        // Set the content type header, so that we get the response in JSOn
        headers: {
          accept: 'application/json'
        }
      }).then((response) => {
        // Once we get the response, extract the access token from
        // the response body
        const accessToken = response.data.access_token
        // redirect the user to the welcome page, along with the access token
       // res.redirect(`/welcome.html?access_token=${accessToken}`)
        res.send(`access_token=${accessToken}`+requestToken)
       // res.send('Welcome')
      })
}


//https://github.com/login/oauth/authorize?client_id=a92cb6693aa07cc042ed