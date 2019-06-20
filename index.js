"use strict";

const PORT          = 8080;
const express       = require("express");
const app           = express();
const passport      =require('passport');
require('dotenv').config();


app.use(express.static("public"));

var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_KEY,
  clientSecret: process.env.LINKEDIN_SECRET,
  callbackURL: process.env.CALLBACK_URL,
  scope: ['r_emailaddress', 'r_liteprofile'],
}, function(accessToken, refreshToken, profile, done) {
  // asynchronous verification, for effect...
  process.nextTick(function () {
    // To keep the example simple, the user's LinkedIn profile is returned to
    // represent the logged-in user. In a typical application, you would want
    // to associate the LinkedIn account with a user record in your database,
    // and return that user instead.
    return done(null, profile);
  });
}));

app.get('/auth/linkedin',
  passport.authenticate('linkedin', { state: 'SOME STATE'  }),
  function(req, res){
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  });

  app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

app.get('/', function (req, res) {
  res.send(`
    <!DOCTYPE html>
      <html>
      <head>
        <title>Title of the document</title>
      </head>
      
      <body>
        The content of the document......
      </body>
    
    </html> 
  `);
})

const server = app.listen(process.env.PORT || PORT, () => {

  console.log("Example app listening on port " + (process.env.PORT || PORT));

});