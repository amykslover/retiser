//load bcrypt
var bCrypt = require('bcrypt-nodejs');
 
var LocalStrategy    = require('passport-local').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;

var configAuth = require('../auth');

module.exports = function(passport, user) {
 
    var User = user;
    // var LocalStrategy = require('passport-local').Strategy;
 
        //serialize
    passport.serializeUser(function(user, done) { 
        done(null, user.id);
    });



    // deserialize user 
    passport.deserializeUser(function(id, done) {
        User.findById(id).then(function(user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
     
        });
     
    });

    // =========================================================================
    // LOCAL ===================================================================
    // =========================================================================

    //WORKING -- Add a new local strategy for sign-up
    passport.use('local-signup', new LocalStrategy(
 
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
 
        },
 
 
        function(req, email, password, done) {
            var generateHash = function(password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
 
            };
 

            //Using the Sequelize user model we initialized earlier as User, 
            //we check to see if the user already exists, and if not we add them.
            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
                if (user)
                {
                    return done(null, false, {
                        message: 'That email is already taken'
                    });
 
                } else
 
                {
 
                    var userPassword = generateHash(password);
 
                    var data =
 
                        {
                            email: email,
                            password: userPassword,
                            username: req.body.username 
                        };
 
                    User.create(data).then(function(newUser, created) {
 
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);
                        }
 
                    });
 
                }
 
            });
 
        }
 
    ));


    //WORKING -- LOCAL SIGNIN
    passport.use('local-login', new LocalStrategy(
     
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
     
        },
     
     
        function(req, email, password, done) {
     
            var User = user;
            var isValidPassword = function(userpass, password) {
     
                return bCrypt.compareSync(password, userpass);
     
            }

            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
                if(!user) {
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                }
     
                if(!isValidPassword(user.password, password)) {
                    return done(null, false, req.flash('loginMessage', 'Incorrect password.'));

                }

                var userinfo = user.get();

                return done(null, userinfo);
                console.log("userinfo")
                console.log(userinfo)
     
     
            }).catch(function(err) {
     
                console.log("Error:", err);
     
                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });
     
            });
     
     
        }
     
    ));

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================

    passport.use(new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,

    },
    function(token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {
            // try to find the user based on their google id
            console.log('=====================================')
            console.log(profile.id);
            User.findOne({ where: { 'google_id' : profile.id }})
            .then(function(error, user) {
                if (error)
                    return done(error);

                if (user) {
                    // if a user is found, log them in
                    return done(null, user);
                } 

                else {

                    var data =
 
                        {
                            google_id: profile.id,
                            google_token: token,
                            email: profile.emails[0].value,
                            username: profile.displayName 
                        };
                    
                    User.create(data).then(function(newUser, created) {
 
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);
                        }
 
                    });
                }
            });
        });

    }));
 
}