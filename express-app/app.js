const express = require('express'),
      path = require('path'),
      //favicon = require('serve-favicon'),
      logger = require('morgan'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      routes = require('./routes/index'),
      users = require('./routes/users'),
      app = express();
const Sequelize = require('sequelize');

// Create Connection with mySQL
const sequelize = new Sequelize({
  database: 'digicard_db',
  username: 'root',
  password: null,
  dialect: 'mysql'
});

// Timestamp
const TIMESTAMP = require('sequelize-mysql-timestamp')(sequelize);

const Student = sequelize.define('student', {
  sno:          {type: Sequelize.STRING(20), primaryKey: true, allowNull: false},
  last_name:    Sequelize.STRING(50),
  first_name:   Sequelize.STRING(50),
  middle_name:  Sequelize.STRING(50),
  course:       Sequelize.STRING(50),
  college:      Sequelize.STRING(50),
  timein:       TIMESTAMP,
  timeout:      TIMESTAMP,
  validated:    Sequelize.BOOLEAN,
  session:      Sequelize.BOOLEAN,
  freehours:    Sequelize.TIME(2),
  seatno:       Sequelize.INTEGER(10),
  credits:      Sequelize.FLOAT(7,2)
},
{
  timestamps: false,
  freezeTableName: true
})

Student.findAll().then(students => {
  console.log(students);
})


// Error handling

// Listen
app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
 });

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

//catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');

  err.status = 404;
  next(err);
});


//development error handler
//will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

//production error handler
//no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
