const FacebookTokenStrategy = require('passport-facebook-token');
const passport = require("passport")
const User = require("../model/User")

// return a user authenticated with facebook
passport.use(new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    fbGraphVersion: 'v3.0'
  }, async function(accessToken, refreshToken, profile, done) {

     // find user
    var user = await User.findOne({facebookId:profile.id});

    // create if not exist user
    if(!user){
      try {
          user = new User({username:profile.displayName, 
          email:profile.emails[0].value, 
          facebookId:profile.id})
          await user.save()
          console.log("User created with facebook");
          
      } catch (error) {
        return done(error, user);
      }
    }
    return done(null, user);
  }
));
