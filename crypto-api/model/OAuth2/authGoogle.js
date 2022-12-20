const GoogleStrategy = require("passport-google-oauth2").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const db = require("../../helper/db");
const config = require('../../config.json')

module.exports = function (passport) {

        passport.use(
            new GoogleStrategy({
                    clientID: process.env.GOOGLE_CLIENT_ID || "131515680100-sb9rhpqs9hhu2qqkrir3v41a2h6gp3vt.apps.googleusercontent.com",
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "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",
                    callbackURL: "http://localhost:5000/api/callback",
                    passReqToCallback: true,
                },  
                
                async (request, accessToken, refreshToken, user, done) => {

                    try {

                        let existingUser = await db.Users.findOne({ 'google.id': user.id });

                        console.log('user existing' , existingUser);
                            if (existingUser) {

                                return done(null, existingUser);

                            } else {

                            console.log('Creating new user...');

                            const newUser = new db.Users.create({
                                method: 'google',
                                    google: {
                                        id: user.id,
                                        username: user.username,
                                        email: user.email[0].value
                                    }
                                });

                            await newUser.save();
                        }

                        return done(null, newUser);

                    } catch (error) {
                        return done(error, false)
                    }
                },
            )),
            passport.use(
                new JwtStrategy(
                        {
                            jwtFromRequest: ExtractJwt.fromHeader("authorization"),
                            secretOrKey: config.secret,
                        },
                    async (jwtPayload, done) => {
                        try {
                            const user = jwtPayload.user;
                            done(null, user); 
                        } catch (error) {
                            done(error, false);
                        }
                    }
                )),
                    passport.serializeUser(function (user, done) {
                        done(null, user);
                    }
                ),
                    passport.deserializeUser(function (user, done) {
                        done(null, user);
                    }
                ) 
        }
            
            