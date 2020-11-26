const GoogleTokenStrategy = require('passport-google-token').Strategy;
const passport = require("passport")
const User = require("../model/User")

// return a user authenticated with Google
passport.use(new GoogleTokenStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_APP_SECRET,
  }, async function(accessToken, refreshToken, profile, done) {
    
    // find user
    var user = await User.findOne({googleId:profile.id});

    // create if not exist user
    if(!user){
      try {
          user = new User({username:profile.displayName, 
          email:profile.emails[0].value, 
          avatar:profile._json.picture,
          googleId:profile.id})

          await user.save()
          console.log("User created with Google");
          
      } catch (error) {
        return done(error, false);
      }
    }
    return done(null, user);
  }
));