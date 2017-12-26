var authController = require('../controllers/authcontroller.js');
 
 
module.exports = function(app, passport) {


    // =====================================
    // LOCAL ROUTES ========================
    // =====================================

 
    app.get('/signup', authController.signup);
 
    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/dashboard',
 
            failureRedirect: '/signup'
        }
 
    ));
 
    app.get('/signin', authController.signin);
 
    app.post('/signin', passport.authenticate('local-signin', {
            successRedirect: '/dashboard',
            failureRedirect: '/signin'
        }
 
    ));
 
    app.get('/dashboard', isLoggedIn, authController.dashboard);
 
    app.get('/logout', authController.logout);



    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
 
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/dashboard',
                    failureRedirect : '/'
            }));




    // function isLoggedIn(req, res, next) {
 
    //     if (req.isAuthenticated())
 
    //         return next();
 
    //     res.redirect('/signin');
 
    // }
 
}



// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
