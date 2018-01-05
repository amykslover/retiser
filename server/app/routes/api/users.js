//function is called in server.js and app & passport are passed in
//require('./app/routes/routes.js')(app, passport);
const router = require("express").Router();
const db = require("../../models");
const csvjson = require('csvjson');
const fs = require('fs');

// module.exports = function(app, passport) {
    //This should take data fromt the axios helper and create a user in the db

    router.post("/login", function(req, res) {

        db.User.findOrCreate({ 
            where: {email: req.body.email},
            defaults: {
                        firstname: req.body.firstName, 
                        lastname: req.body.lastName, 
                        google_id: req.body.google_id
                    } 
        }).spread((user, created) => {
            console.log(user.get({plain: true}));
            console.log(created);
            res.json(user);
        }).catch(error => res.status(422).json(error));
    });

    //Get all data from user on login
    router.get("/:id", function(req, res) {
        const currentUser = req.params.id

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
          ]}]
        }).then(function(data) {
          res.json(data);
        });
    });

    //Get all transactions from user on login
    router.get("/:id/transactions", function(req, res) {
        const currentUser = req.params.id

        db.Account.findAll({
            where : 
            { UserId : currentUser},
            include: [
            {
                model  : db.Transaction
            }
          ]
        }).then(function(data) {
            let transactions = []
            for (var i = 0; i < data.length; i++) {
            
                accountTx = data[i].dataValues.Transactions

                for (var i = 0; i < accountTx.length; i++) {
                    accountTxDetails = accountTx[i].dataValues;
                    transactions.push(accountTxDetails)
                }            
            }
            res.json(transactions);
        });
    });

    //Create a new account for a user
    router.post("/:id/account", function(req, res) {

        const userID = req.body.userId
        const accountNumber = req.body.accountNumber;
        const accountType = req.body.accountType;
        const accountInstitution = req.body.accountInstitution;
        const transactionData = req.body.accountTransactions;

        let transactionAccount;

        db.Account.create({
            number: accountNumber,
            institution: accountInstitution,
            type: accountType,
            UserId: userID
        }).then(function(dbAccount) {
            transactionAccount = dbAccount.dataValues.id;

            for (var i = 1; i < transactionData.length; i++) {

                var date         = transactionData[i][0];
                var amount      = transactionData[i][1]
                var description  = transactionData[i][2];
                var category     = transactionData[i][3];
                var month        = parseInt(transactionData[i][4]);
                var year         = parseInt(transactionData[i][5]);

                // console.log('======================================= Transaction' + i)
                // console.log('DATE: ' + date);
                // console.log('AMOUNT: ' + amount);
                // console.log('DESCRIPTION: ' + description);
                // console.log('CATEGORY: ' + category);
                // console.log('MONTH: ' + month);
                // console.log('YEAR: ' + year);
                // console.log(transactionAccount)


                db.Transaction.create({
                    date: date,
                    month: month,
                    year: year,
                    description: description,
                    amount: amount,
                    category: category,
                    AccountId: transactionAccount
                }).then(function(dbTransaction) {
                    newTransaction = dbTransaction.dataValues.id
                    console.log('Transaction Created: ' + newTransaction)
                })
            }
        })
    });

    router.delete("/:id/account/:accountid", function(req, res) {
        const currentAccount = req.params.accountid
        
        db.Account.destroy({
            where: { id: currentAccount }
        }).then(function(dbAccount) {
            console.log(dbAccount);
        })
    });
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
