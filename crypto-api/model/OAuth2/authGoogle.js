const GoogleStrategy = require("passport-google-oauth2").Strategy;
const db = require("../helpers/db");

module.exports = function (passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "http://localhost:5000/api/callback",
                passReqToCallback: true,
            },
            async (request, accessToken, refreshToken, profile, done) => {
              try{
                const user = await db.Users.findOne({where: {email: profile.email}});
                if (user) {
                    done(null, user);
                } else {
                    const newUser = await db.Users.create({
                        email: profile.email,
                        password: profile.id,
                        username: profile.displayName,
                        role: "User",
                    });
                    done(null, newUser);
                }
              } catch (err) {
                
                console.log(err);
            }
        }
    )
);
passport.serializeUser(function (user, done) {
    done(null, user);
}
);
passport.deserializeUser(function (user, done) {
    done(null, user);
}
);
};
