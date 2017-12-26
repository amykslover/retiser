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
                            firstname: req.body.firstname,
                            lastname: req.body.lastname
 
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


        //LOCAL SIGNIN
    passport.use('local-login', new LocalStrategy(
     
        {
            // by default, local strategy uses username and password, we will override with email
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
                    // return done(null, false, {
                    //     message: 'Email does not exist'
                    // });
                }
     
                if(!isValidPassword(user.password, password)) {
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                    // return done(null, false, {
                    //     message: 'Incorrect password.'
                    // });
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
            User.findOne({ 'google.id' : profile.id }, function(err, user) {
                if (err)
                    return done(err);

                if (user) {

                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // if the user isnt in our database, create a new user
                    var newUser          = new User();

                    // set all of the relevant information
                    newUser.google.id    = profile.id;
                    newUser.google.token = token;
                    newUser.google.name  = profile.displayName;
                    newUser.google.email = profile.emails[0].value; // pull the first email

                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });

    }));
 
}