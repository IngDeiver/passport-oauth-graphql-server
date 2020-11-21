const  {GraphQLLocalStrategy}  = require ("graphql-passport")
const passport = require("passport")
const User = require("../model/User")

// return a user if exist in the database
passport.use(new GraphQLLocalStrategy((username, password, done) => {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
));