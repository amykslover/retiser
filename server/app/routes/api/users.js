//function is called in server.js and app & passport are passed in
//require('./app/routes/routes.js')(app, passport);
const router = require("express").Router();
const db = require("../../models");

// module.exports = function(app, passport) {
    //This should take data fromt the axios helper and create a user in the db

    router.post("/login", function(req, res) {
        console.log(`Create for body: ${JSON.stringify(req.body)}`);
        db.User
          .findOrCreate({ where: {email: req.body.email},
                            defaults: {
                                firstname: req.body.firstName, 
                                lastname: req.body.lastName, 
                                google_id: req.body.google_id} 
                            })
          .spread((user, created) => {
                console.log(user.get({plain: true}));
                console.log(created);
                res.json(user);
          })
          .catch(error => res.status(422).json(error));
    });
    //This should retrieve all the data from the user that is logged in
    router.get("/:id", function(req, res) {
        const currentUser = req.params.id
        console.log('Current User');
        console.log(currentUser);


        db.User.findOne({
            where : 
            { id : currentUser},
            include: [
            { 
                model  : db.Account,
            include: [
            {
              model  : db.Transaction
            }
          ]
        }
      ]
    }).then(function(data) {
          res.json(data);
      });

});

    router.get("/:id/account/:accountid", function(req, res) {
        console.log(`Create for body: ${JSON.stringify(req.body)}`);


        console.log('Current Account');
        const currentAccount = req.params.accountid
        console.log(currentAccount);
        
        db.Transaction.findAll(
        {
            include: [ 
                { 
                    model: db.Account,
                    where: { id: currentAccount }
                }
            ]
        })
        .then(function(transactions) {
          res.json(transactions);
        });
    });


    router.post("/:id/account", function(req, res) {
        console.log(`Create for body: ${JSON.stringify(req.body)}`);
        // const userID = {req.body.userId}
        // const accountNumber = req.body.accountNumber;
        // const accountType = req.body.accountType;
        // const accountInstitution = req.body.accountInstitution;
        // const transactionData = {req.body.transactions};

        db.Account.create({
            number: accountNumber,
            institution: accountInstitution,
            type: accountType,
            UserId: userID
        }).then(function(dbAccount) {
            console.log(dbAccount);
        })

    });

        // db.Account.create({
        //     number: ,
        //     institution: ,
        //     type:  ,
        //     UserId: 
        // }).then(function(dbAccount) {
          
        //   console.log(dbAccount);

        //   db.Transaction.bulkCreate({
        //     date: ,
        //     month: ,
        //     year: ,
        //     description: ,
        //     amount: ,
        //     category: ,
        //     AccountId: dbAccount.dataValues.id,
        //   }).then(function(result) {
        //     response.json(result);
        //   })
        // });

    // });
    // ===================================================================
    // HOME PAGE (with login links) ======================================
    // ===================================================================
    // app.get('/', function(req, res) {
    //     res.render('index.ejs'); // load the index.ejs file
    // });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // router.get('/login', function(req, res) {
    //     res.send('login hit')

    //     // render the page and pass in any flash data if it exists
    //     // res.render('login.ejs', { message: req.flash('loginMessage') });
    // });


    // =====================================
    // SIGNUP ==============================
    // =====================================
    router.get('/signup', function(req, res) {
        res.send('signup hit')
        //Render the page and pass in any flash data if it exists
        // res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // router.post('/signup', passport.authenticate('local-signup', {
    //     // res.send('signup hit')
    //     // successRedirect : '/profile', // redirect to the secure profile section
    //     // failureRedirect : '/signup', // redirect back to the signup page if there is an error
    //     // failureFlash : true // allow flash messages
    // }));

    // process the login form
    // router.post('/login', passport.authenticate('local-login', {
    //     // res.send('login hit')
    //     // successRedirect : '/profile', // redirect to the secure profile section
    //     // failureRedirect : '/login', // redirect back to the signup page if there is an error
    //     // failureFlash : true // allow flash messages
    // }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    router.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    // router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    // router.get('/auth/google/callback',
    //         passport.authenticate('google', {
    //                 successRedirect : '/profile',
    //                 failureRedirect : '/'
    //         }));


// };

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;
