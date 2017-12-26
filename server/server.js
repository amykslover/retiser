var express      = require('express')
var app          = express()
var passport     = require('passport')
var session      = require('express-session')
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser')
var env          = require('dotenv').load()
var exphbs       = require('express-handlebars')
var port         = process.env.PORT || 8080;
var morgan       = require('morgan');
var flash        = require('connect-flash');

//For BodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
 
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

// For Passport
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

 
//========================VIEW ENGINE TEMPORARY=======================
//For EJS
app.set('views', './app/views');
app.set('view engine', 'ejs'); // set up ejs for templating
//For Handlebars
// app.set('views', './app/views')
// app.engine('hbs', exphbs({
//     extname: '.hbs'
// }));
// app.set('view engine', '.hbs');
 
 
 
// app.get('/', function(req, res) {
 
//     res.send('Welcome to Passport with Sequelize');
 
// });
 
//Models
var models = require("./app/models");
// console.log(models);
 
//Routes
//handlebars version
// var authRoute = require('./app/routes/auth.js')(app,passport);
//ejs version
var authRoute = require('./app/routes/routes.js')(app,passport);
 
 
//load passport strategies
require('./config/passport/passport.js')(passport, models.User);
 
 

 // Syncing sequelize models and then start the express app
models.sequelize.sync({ force: true }).then(function() {
    console.log('Nice! Database looks fine')
 
 app.listen(port, function(error) {
     if (!error)
         console.log("Site is live on port: " + port);
     else console.log(error)
     
 });
 
}).catch(function(error) {
 
    console.log(error, "Something went wrong with the database update!")
 
});