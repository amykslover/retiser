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
var path         = require('path')
const routes     = require('./app/routes');

//For BodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

// Enable CORS so that browsers don't block requests.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
// Serve files created by create-react-app.
app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(routes);


// For Passport
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
})); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


//========================VIEW ENGINE TEMPORARY=======================
//For EJS
app.set('views', './app/views');
app.set('view engine', 'ejs'); // set up ejs for templating

//Models
var models = require("./app/models");


//Routes
// var authRoute = require('./app/routes/api/users.js')(app,passport);


//load passport strategies
// require('./config/passport/passport.js')(passport, models.User);

// Any non API GET routes will be directed to our React App and handled by React Router
app.get("*", function(req, res) {
  if ( process.env.NODE_ENV === 'production' ) {
    res.sendFile(__dirname + "../client/build/index.html");
  } else {
    res.sendFile(__dirname + "../client/public/index.html");
  }
});


 // Syncing sequelize models and then start the express app
models.sequelize.sync({ force: true }).then(function() {
    console.log('Nice! Database looks fine')

 app.listen(port, function(error) {
     if (!error)
         console.log("Site is live on port: " + port);
     else console.log(error)
 });

   models.User.bulkCreate([
    {
      firstname: "Thomas",
      lastname: "Smith",
      email: "thomas.smith@mail.com",
      age: 60,
      agi: 90000
    },
    {
      firstname: "Nancy",
      lastname: "Jones",
      email: "n.jones@mail.com",
      age: 29,
      agi: 105000
    },
    {
      firstname: "Amy",
      lastname: "Slover",
      email: "amykslover@gmail.com",
      age: 35,
      agi: 150000
    }
  ])

  models.Account.bulkCreate([
    {
      number: "123456789",
      institution: "Vanguard",
      type: "401k",
      UserId: "1"
    },
    {
      number: "987654321",
      institution: "Pensys",
      type: "401k",
      UserId: "1"
    },
    {
      number: "777777777",
      institution: "Fidelity",
      type: "IRA",
      UserId: "1"
    },
    {
      number: "123456789",
      institution: "Vanguard",
      type: "401k",
      UserId: "3"
    },
    {
      number: "987654321",
      institution: "Pensys",
      type: "401k",
      UserId: "3"
    },
    {
      number: "77777777",
      institution: "Fidelity",
      type: "IRA",
      UserId: "3"
    }
  ])


  models.Transaction.bulkCreate([
    {
      date: "01/10/2017",
      month: 1,
      year: 2016,
      description: "SAFE HARBOR MATCH",
      amount: '1500.96',
      category: "Employer Contribution",
      AccountId: "5"
    },
    {
      date: "01/13/2017",
      month: 1,
      year: 2017,
      description: "SAFE HARBOR MATCH",
      amount: 250.00,
      category: "Employer Contribution",
      AccountId: "5"
    },
    {
      date: "01/13/2017",
      month: 1,
      year: 2017,
      description: "PRE TAX CONTRIBUTION",
      amount: 500.00,
      category: "Contribution",
      AccountId: "5"
    },
    {
      date: "01/30/2017",
      month: 1,
      year: 2017,
      description: "SAFE HARBOR MATCH",
      amount: 310.00,
      category: "Employer Contribution",
      AccountId: "5"
    },
    {
      date: "01/30/2017",
      month: 1,
      year: 2017,
      description: "PRE TAX CONTRIBUTION",
      amount: 620.00,
      category: "Contribution",
      AccountId: "5"
    },
    {
      date: "02/01/2017",
      month: 2,
      year: 2017,
      description: "DFA ONE-YEAR FIXED INCOME",
      amount: 0.33,
      category: "Dividend",
      AccountId: "5"
    },
    {
      date: "02/01/2017",
      month: 2,
      year: 2017,
      description: "DFA ONE-YEAR FIXED INCOME",
      amount: 0.47,
      category: "Dividend",
      AccountId: "5"
    },
    {
      date: "02/15/2017",
      month: 2,
      year: 2017,
      description: "SAFE HARBOR MATCH",
      amount: 250.00,
      category: "Employer Contribution",
      AccountId: "5"
    },
    {
      date: "02/15/2017",
      month: 2,
      year: 2017,
      description: "PRE TAX CONTRIBUTION",
      amount: 500.00,
      category: "Contribution",
      AccountId: "5"
    },
    {
      date: "02/27/2017",
      month: 2,
      year: 2017,
      description: "SAFE HARBOR MATCH",
      amount: 250.00,
      category: "Employer Contribution",
      AccountId: "5"
    },
    {
      date: "02/27/2017",
      month: 2,
      year: 2017,
      description: "PRE TAX CONTRIBUTION",
      amount: 500.00,
      category: "Contribution",
      AccountId: "5"
    }
  ])

}).catch(function(error) {

    console.log(error, "Something went wrong with the database update!")

});
