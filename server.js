var express      = require('express');
var app          = express();
var port         = process.env.PORT || 8080;
var passport     = require('passport');
var session      = require('express-session');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var sequelize    = require('sequelize');
var flash        = require('connect-flash');
var morgan       = require('morgan');
var env          = require('dotenv').load();
var exphbs 		 = require('express-handlebars')
// var configDB     = require('./config/database.js');


// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

//For BodyParser
// app.use(bodyParser()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(flash()); // use connect-flash for flash messages stored in session

// app.set('view engine', 'ejs'); // set up ejs for templating

// For Passport
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


//For Handlebars
app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');


app.get('/', function(req, res) {
    res.send('Welcome to Passport with Sequelize');
 
});


//Models
var db = require("./app/models");


require('./config/passport')(passport); // pass passport for configuration
require('./app/config/passport/passport.js')(passport, db.user);
//Routes ======================================================================
require('./app/routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
 
//Syncing sequelize models and then start the express app
// db.sequelize.sync({ force: true }).then(function() {
//     console.log('Nice! Database looks fine')
 
// 	app.listen(port, function(error) {
// 	    if (!error)
// 	        console.log("Site is live on port: " + port);
// 	    else console.log(error)
	 
// 	});
 
// }).catch(function(error) {
 
//     console.log(error, "Something went wrong with the database update!")
 
// });

db.sequelize.sync({ force: true }).then(function() {
    console.log('Nice! Database looks fine')
}).catch(function(error) {
    console.log(error, "Something went wrong with the database update!")
});


app.listen(port, function(error) {
    if (!error) {
    	console.log("Site is live on port: " + port);
    }
    else {
    	console.log(error)
    }
});

