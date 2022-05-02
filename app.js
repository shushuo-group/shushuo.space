var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var compression = require('compression');
var ejs = require('ejs');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var findPasswordRouter = require('./routes/findPassword');
var mainAppRouter = require('./routes/mainApp');
var personRouter = require('./routes/person');
var writerRouter = require('./routes/writer');
var CheckLoginRouter = require('./routes/CheckLogin');
var completeRouter = require('./routes/complete');
var uploadMediaRouter = require('./routes/uploadMediaRouter');
var articleRouter = require('./routes/article');


var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');

app.use(express.json());
app.use(compression());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
var options = {
    maxAge: '365d'
}

app.use(express.static(path.join(__dirname, 'public'),options));
app.use(express.static(path.join(__dirname, 'upload'),options));

app.disable('x-powered-by');


app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/findPassword', findPasswordRouter);
app.use('/mainApp', mainAppRouter);
app.use('/person', personRouter);
app.use('/writer', writerRouter);
app.use('/CheckLogin', CheckLoginRouter);
app.use('/complete', completeRouter);
app.use('/uploadMedia', uploadMediaRouter);
app.use('/article', articleRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
